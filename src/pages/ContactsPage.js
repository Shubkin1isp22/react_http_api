export default function ContactsPage() {
  return (
    <div className="container">
      <h1>Контакты</h1>

      <p><strong>Email:</strong> study@lingoschool.com</p>
      <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
      <p><strong>Адрес:</strong> г. Москва, ул. Испанская, 12</p>

      <iframe
        title="map"
        width="100%"
        height="300"
        style={{ borderRadius: "12px", border: "0", marginTop: "20px" }}
        src="https://maps.google.com/maps?q=madrid&t=&z=13&ie=UTF8&iwloc=&output=embed"
      />
    </div>
  );
}