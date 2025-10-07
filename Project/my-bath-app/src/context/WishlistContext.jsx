import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { addToWishlist as apiAdd, removeFromWishlist as apiRemove, getMyWishlist as apiGet } from '../utils/api';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { user, token } = useAuth();
  const userId = user?.id || user?._id || null;
  const storageKey = useMemo(() => (userId ? `wishlist:${userId}` : 'wishlist:guest'), [userId]);
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const saved = localStorage.getItem(storageKey);
        const localIds = saved ? JSON.parse(saved) : [];
        if (mounted) setIds(localIds);

        if (token && userId) {
          setLoading(true);
          try {
            const server = await apiGet(token);
            const serverIds = Array.isArray(server) ? server.map(p => p?._id || String(p)) : [];
            if (mounted) {
              const merged = Array.from(new Set([...(localIds || []), ...serverIds]));
              setIds(merged);
              localStorage.setItem(storageKey, JSON.stringify(merged));
            }
          } catch (e) {
            // keep local
          } finally {
            if (mounted) setLoading(false);
          }
        }
      } catch {}
    };
    load();
    return () => { mounted = false; };
  }, [token, storageKey, userId]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(ids)); } catch {}
  }, [ids, storageKey]);

  const isWishlisted = (productId) => ids.includes(productId);

  const add = async (productId) => {
    setIds(prev => (prev.includes(productId) ? prev : [...prev, productId]));
    if (token) {
      try { await apiAdd(productId, token); } catch {}
    }
  };

  const remove = async (productId) => {
    setIds(prev => prev.filter(id => id !== productId));
    if (token) {
      try { await apiRemove(productId, token); } catch {}
    }
  };

  const toggle = async (productId) => {
    if (!productId) return;
    if (isWishlisted(productId)) {
      await remove(productId);
    } else {
      await add(productId);
    }
  };

  const value = { ids, loading, isWishlisted, add, remove, toggle };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);



