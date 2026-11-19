import type { Metadata } from 'next';

export default function robots(): Metadata['robots'] {
  return {
    index: false,
    follow: false,
  };
}
