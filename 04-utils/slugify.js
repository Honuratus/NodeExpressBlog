function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^\w\s-]/g, '')    
    .replace(/\s+/g, '-')        
    .replace(/--+/g, '-')        
    .replace(/^-+|-+$/g, '');    
}

export default slugify