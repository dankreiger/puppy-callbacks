import { useCallback, useState } from 'react';

export default () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleToggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen, setMobileMenuOpen]);
  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);
  return { handleToggleMobileMenu, handleCloseMobileMenu, mobileMenuOpen };
};
