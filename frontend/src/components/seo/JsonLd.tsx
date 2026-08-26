export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Archazor Mountain Resort & Spa',
    description: 'Toshkent viloyati Bo\'stonliq tumanidagi Chimyon tog\' tizmasida joylashgan premium resort va SPA majmuasi.',
    url: 'https://archazor.uz',
    telephone: '+998909998877',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chimyon tog\' zonasi',
      addressLocality: 'Bo\'stonliq tumani',
      addressRegion: 'Toshkent viloyati',
      addressCountry: 'UZ'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.5000',
      longitude: '70.0000'
    },
    starRating: {
      '@type': 'Rating',
      ratingValue: '5'
    },
    priceRange: '$$$'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
