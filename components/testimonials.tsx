import Image from "next/image";

export function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, TechCorp",
      content: "Amazing service! Highly recommended.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jane Smith",
      role: "Designer, CreativeCo",
      content: "The team is incredibly talented and professional.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Mike Johnson",
      role: "Founder, StartupX",
      content: "They delivered beyond our expectations.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <section id="testimonials" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
