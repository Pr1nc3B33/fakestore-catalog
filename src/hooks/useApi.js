import { useQuery } from '@tanstack/react-query';

const BASE = 'https://fakestoreapi.com';

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchJson(`${BASE}/products/categories`),
    staleTime: Infinity, // Categories never change during a session
  });

export const useProducts = (category) =>
  useQuery({
    queryKey: ['products', category],
    queryFn: () =>
      category && category !== 'all'
        ? fetchJson(`${BASE}/products/category/${encodeURIComponent(category)}`)
        : fetchJson(`${BASE}/products`),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData, // Keep previous results visible while new ones load
  });
