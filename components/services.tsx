export function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Custom web solutions tailored to your needs.",
    },
    {
      title: "Mobile Apps",
      description: "Innovative mobile applications for iOS and Android.",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces.",
    },
    {
      title: "Cloud Services",
      description: "Scalable and reliable cloud infrastructure.",
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
