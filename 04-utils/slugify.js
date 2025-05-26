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
    .replace(/[^\w\s-]/g, '')    // noktalama işaretlerini temizle
    .replace(/\s+/g, '-')        // boşlukları tireye çevir
    .replace(/--+/g, '-')        // çift tireleri tek yap
    .replace(/^-+|-+$/g, '');    // baştaki/sondaki tireleri sil
}

export default slugify