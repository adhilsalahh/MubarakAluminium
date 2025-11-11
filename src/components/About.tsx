import { Award, Users, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Quality Craftsmanship',
    description: 'Over 20 years of experience in aluminum fabrication'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Skilled professionals dedicated to excellence'
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'Projects completed on schedule, every time'
  },
  {
    icon: Shield,
    title: 'Warranty',
    description: 'Comprehensive warranty on all our products'
  }
];

export default function About() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We deliver exceptional quality and service in every project
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-12 shadow-lg border-2 border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform inline-block">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform inline-block">20+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform inline-block">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
