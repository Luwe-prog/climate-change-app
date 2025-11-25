import React, { useState, useEffect } from 'react';
import { Leaf, Droplets, Wind, Sun, Recycle, TreePine, Lightbulb, Factory, Globe } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-green-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="text-green-300 w-8 h-8" />
            <span className="text-white font-bold text-xl">EcoAwareness</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#hero" className="text-white hover:text-green-300 transition-colors">Home</a>
            <a href="#what-is" className="text-white hover:text-green-300 transition-colors">What is Climate Change</a>
            <a href="#solutions" className="text-white hover:text-green-300 transition-colors">Solutions</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-300/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-800 via-teal-700 to-blue-900">
      <FloatingParticles />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 text-center px-4 animate-fadeIn">
        <div className="mb-8 flex justify-center">
          <Globe className="w-24 h-24 text-green-300 animate-spin-slow" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Climate Change Awareness
        </h1>
        <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
          Let's learn about climate change and how we can help our environment
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-2xl">
          Start Learning
        </button>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle, icon: Icon }) => {
  return (
    <div className="text-center mb-16 animate-fadeInUp">
      <div className="flex justify-center mb-4">
        <Icon className="w-16 h-16 text-green-600" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

// 3D Info Card Component with Read More
const InfoCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldTruncate = description.length > 120;
  const displayText = isExpanded || !shouldTruncate 
    ? description 
    : description.slice(0, 120) + '...';

  return (
    <div
      className="relative group animate-fadeInUp"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative bg-white rounded-2xl p-8 shadow-xl transition-all duration-300 transform ${isHovered ? 'scale-105 shadow-2xl -translate-y-2' : ''}`}>
        {/* 3D Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-green-500 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{displayText}</p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-green-600 hover:text-green-700 font-semibold text-sm flex items-center transition-colors"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
              <span className="ml-1">{isExpanded ? '↑' : '→'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Expandable Text Component for Large Sections
const ExpandableText = ({ children, maxLength = 200 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? text 
    : text.slice(0, maxLength) + '...';

  return (
    <div>
      <p className="text-lg text-gray-700 leading-relaxed">{displayText}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-all transform hover:scale-105"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

// Expandable Text Component for White Text on Colored Backgrounds
const ExpandableTextWhite = ({ children, maxLength = 200 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? text 
    : text.slice(0, maxLength) + '...';

  return (
    <div>
      <p className="text-lg leading-relaxed opacity-90">{displayText}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-full transition-all transform hover:scale-105 backdrop-blur-sm"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

// 3Rs Card Component with Read More
const ThreeRCard = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  const shouldTruncate = text.length > 100;
  const displayText = isExpanded || !shouldTruncate 
    ? text 
    : text.slice(0, 100) + '...';

  return (
    <div className="text-center">
      <h4 className="text-2xl font-bold mb-4">{title}</h4>
      <p className="text-lg opacity-90">{displayText}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-white/80 hover:text-white font-semibold text-sm underline"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

// What Is Climate Change Section
const WhatIsSection = () => {
  return (
    <section id="what-is" className="py-24 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader 
          title="What is Climate Change?"
          subtitle="Let's explore the definition, causes, and effects of climate change"
          icon={Globe}
        />

        {/* Main Definition Card with Glassmorphism */}
        <div className="mb-16 animate-fadeInUp">
          <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-green-200">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-500 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50"></div>
            
            <div className="relative">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <Droplets className="w-10 h-10 mr-4 text-blue-600" />
                Definition of Climate Change
              </h3>
              <ExpandableText maxLength={500}>
                  Climate change refers to the long-term alteration of the Earth’s weather patterns. It occurs when the
                  planet becomes warmer or colder over a long period of time, not just for a few days or months.
                  Nowadays, it is mostly caused by human activities such as burning fossil fuels and cutting down trees.              </ExpandableText>
            </div>
          </div>
        </div>

        {/* Causes Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">Causes of Climate Change</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard 
              icon={Factory}
              title="Greenhouse Gases"
              description="Although the Philippines contributes only 0.48% of global greenhouse gas emissions, it remains highly vulnerable to climate change. National emissions continue to rise, with 41% coming from coal and fuel oil used for power generation and 35% from land, air, and water transportation.
              Globally, fossil fuels accounted for 77% of primary energy use and over 60% of electricity production in 2023. Their combustion produces significant environmental impacts, with carbon dioxide from fossil fuel burning responsible for more than 70% of human-related greenhouse gas emissions in 2022. This makes fossil fuels the leading driver of global warming and ocean acidification."
              delay={0}
            />
            <InfoCard 
              icon={TreePine}
              title="Deforestation"
              description="Deforestation is a significant contributor to climate change and undermines forest resilience. It is the second-largest source of human-generated CO₂ emissions—after fossil fuel use—due to tree burning and the release of carbon stored in soils. In 2019, deforestation accounted for approximately 11% of global greenhouse gas emissions, with rates increasing in tropical regions. Although forests serve as essential carbon sinks, climate-related disturbances such as wildfires, invasive species, and extreme weather weaken them further. This creates a harmful feedback loop in which deforestation intensifies climate change, which in turn accelerates forest loss."
              delay={100}
            />
            <InfoCard 
              icon={Factory}
              title="Pollution"
              description="Air pollution has become increasingly severe in the Philippines over the past year. According to the World Health Organization’s health and environment scorecard, the country’s annual average concentration of fine particulate matter is 24 μg/m³, far above the recommended limit of 5 μg/m³. Much of this pollution results from the burning of fossil fuels such as coal and oil. Additionally, 53% of the population lacks access to clean cooking fuels and technologies, a condition that is likely to worsen air quality over time."
              delay={200}
            />
          </div>
        </div>

        {/* Effects Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">Effects of Climate Change</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard 
              icon={Sun}
              title="Global Warming"
              description="Global warming is the long-term increase in the Earth’s surface temperature, driven mainly by rising concentrations of greenhouse gases in the atmosphere. Its impacts extend far beyond higher temperatures. Heat waves have become more frequent and intense across most land regions, increasing heat-related illnesses and mortality, while making outdoor work more dangerous—especially in tropical countries. Ecosystems are also being disrupted as species migrate toward cooler areas, and hotter, drier conditions have made wildfires more frequent and harder to control. The oceans, which absorb most of the excess heat, are experiencing marine heatwaves, coral bleaching, and reduced oxygen levels, all of which threaten marine biodiversity and fisheries."
              delay={0}
            />
            <InfoCard 
              icon={Wind}
              title="Stronger Storms"
              description="Although the total number of tropical cyclones may not necessarily increase, climate change is making them significantly more intense and dangerous. Warmer ocean temperatures and higher atmospheric moisture provide additional energy for storms, resulting in stronger winds and heavier rainfall. Rising sea levels combined with more powerful cyclones also produce more destructive storm surges during landfall. In addition, storms are now more likely to undergo rapid intensification, reducing the time available for communities to prepare or evacuate and increasing the risk of severe impacts."
              delay={100}
            />
            <InfoCard 
              icon={Droplets}
              title="Sea Level Rise"
              description="Global sea levels are rising at an accelerating pace, primarily due to the thermal expansion of warming ocean waters and the continued melting of glaciers and ice sheets. This rise increases the risk of coastal flooding, erosion, and landslides, as higher sea levels allow storm surges to extend farther inland during extreme weather events. Critical infrastructure and water resources are also threatened, with roads, bridges, water systems, and sewage facilities facing potential inundation. In addition, saltwater intrusion can contaminate freshwater aquifers, jeopardizing drinking water supplies and agricultural productivity."
              delay={200}
            />
          </div>
        </div>

        {/* Philippines & Lubao Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-teal-600 rounded-3xl p-10 text-white shadow-2xl transform hover:scale-105 transition-all animate-fadeInUp">
            <h3 className="text-3xl font-bold mb-6">Climate Change in the Philippines</h3>
            <ExpandableTextWhite maxLength={200}>
              The Philippines is consistently identified as one of the world’s most climate-vulnerable countries. Climate-related hazards—such as extreme weather events, coral bleaching, and coastal degradation—pose serious risks to the nation’s economy, ecosystems, and community livelihoods. From 2000 to 2019, the country ranked as the fourth most affected by climate impacts, underscoring the severity of its exposure.
              Its location within the typhoon belt and its extensive coastlines heighten this vulnerability, threatening natural resources and the well-being of millions. These increasing risks highlight the urgent need for strengthened adaptation and mitigation strategies to protect communities and support a more sustainable and climate-resilient future.
            </ExpandableTextWhite>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-10 text-white shadow-2xl transform hover:scale-105 transition-all animate-fadeInUp" style={{animationDelay: '100ms'}}>
            <h3 className="text-3xl font-bold mb-6">Climate Change in Lubao, Pampanga</h3>
            <ExpandableTextWhite maxLength={200}>
              Lubao, situated in a low-lying area within the Tarlac-Nueva Ecija-Pampanga-Bulacan valley, is traversed by waters flowing from the highlands of Benguet, Zambales, and Rizal toward northern Manila Bay. Due to its vulnerability to flooding, the town has been designated as a hazard-prone area by the government. To monitor rainfall in real time, the Department of Science and Technology has installed a remote monitoring station at Diosdado Macapagal Park near the Lubao Municipal Hall.
              According to Pampanga Governor Lilia Pineda, damage to the local dike has reached a critical level, posing a potential threat to five to six barangays and approximately 30,000 families if floodwaters breach, potentially devastating homes and agricultural lands.
            </ExpandableTextWhite>
          </div>
        </div>
      </div>
    </section>
  );
};

// Solutions Section
const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-24 bg-gradient-to-b from-green-50 to-blue-50 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader 
          title="How to Reduce Things That Harm the Environment"
          subtitle="Practical solutions for a more sustainable future"
          icon={Leaf}
        />

        {/* 3Rs Section - Featured */}
        <div className="mb-16 animate-fadeInUp">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <Recycle className="w-20 h-20 animate-spin-slow" />
            </div>
            <h3 className="text-4xl font-bold mb-8 text-center">3Rs: Reduce, Reuse, Recycle</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <ThreeRCard title="Reduce">
                Reduce means to minimize the amount of waste we generate by consuming only what is necessary and avoiding excess. It encourages thoughtful use of resources, such as buying products with less packaging, opting for durable goods instead of disposable ones, and conserving energy and materials in daily activities. By reducing consumption, we lower the volume of waste sent to landfills and decrease the environmental impact, contributing to the fight against climate change.
              </ThreeRCard>
              <ThreeRCard title="Reuse">
                Reuse involves finding new ways to use items instead of discarding them. This can include repairing, repurposing, or donating products so they serve multiple uses before becoming waste. Reusing extends the life of materials, conserves resources, reduces pollution from manufacturing, and decreases the demand for new products.
              </ThreeRCard>
              <ThreeRCard title="Recycle">
                Recycle is the process of transforming used materials into new products. By separating recyclable waste—such as paper, plastics, glass, and metals—we prevent these items from ending up in landfills or being incinerated. Recycling conserves natural resources, saves energy, reduces greenhouse gas emissions, and supports a circular economy where materials are continuously reused.
              </ThreeRCard>
            </div>
          </div>
        </div>

        {/* Solution Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <InfoCard 
            icon={Sun}
            title="Renewable Energy"
            description="Renewable energy is derived from natural sources that are replenished faster than they are consumed, including sunlight, wind, water, geothermal heat, and ocean currents. Unlike fossil fuels, which release large amounts of carbon dioxide and take millions of years to form, renewable energy produces significantly lower greenhouse gas emissions and supports a transition toward a more sustainable energy system. Solar energy harnesses sunlight through photovoltaic panels or concentrated solar systems, providing electricity, heat, and fuel even in cloudy conditions, while wind energy captures the kinetic energy of air through onshore and offshore turbines, with global potential sufficient to meet a significant portion of electricity demand. Geothermal energy utilizes heat from the Earth’s interior from naturally hot or enhanced reservoirs to generate stable, low-emission electricity. Hydropower generates energy from flowing water in rivers or reservoirs, offering additional benefits such as irrigation, flood control, and drinking water, with small-scale hydro being particularly suitable for remote communities. Emerging ocean energy technologies harness the power of waves, tides, and currents, offering vast long-term potential to supplement the global energy supply. Collectively, these renewable sources are increasingly cost-effective, environmentally friendly, and vital for mitigating climate change while creating jobs and reducing reliance on fossil fuels."
            delay={0}
          />
          <InfoCard 
            icon={TreePine}
            title="Tree Planting / Reforestation"
            description="Reforestation and tree planting restore trees in areas affected by natural events or human activities, helping to rebuild forest canopies and preserve biodiversity. These practices reduce air pollution, absorb carbon dioxide, prevent soil erosion, and lower the risk of floods and landslides. By improving ecosystem health and resilience, tree planting is a key strategy in combating climate change and protecting the environment."
            delay={100}
          />
          <InfoCard 
            icon={Recycle}
            title="Waste Management"
            description="Waste management involves properly handling, disposing, and processing waste to minimize its impact on the environment. Effective waste management reduces pollution, conserves natural resources, prevents soil and water contamination, and helps mitigate climate change. Practices include proper segregation, collection, treatment, and safe disposal of different types of waste."
            delay={200}
          />
          <InfoCard 
            icon={Wind}
            title="Sustainable Transportation"
            description="Sustainable transportation aims to meet mobility needs while reducing environmental impact, improving public health, and promoting social equity. By encouraging walking, cycling, public transit, and electric or hybrid vehicles, cities can significantly lower greenhouse gas emissions and urban pollution. Combined with smart urban planning, policies such as carpooling, stricter vehicle emission standards, and “15-minute cities” where essential services are accessible by foot or bike, sustainable transportation helps create cleaner, healthier, and more livable communities while addressing climate change."
            delay={300}
          />
          <InfoCard 
            icon={Lightbulb}
            title="Energy Conservation"
            description="Energy conservation involves using energy more efficiently and minimizing unnecessary consumption. Simple practices such as turning off unused appliances, using energy-efficient lighting, and optimizing heating or cooling systems can significantly reduce energy use. Conserving energy lowers greenhouse gas emissions, decreases utility costs, and supports sustainable resource management, contributing to climate change mitigation."
            delay={400}
          />
          <InfoCard 
            icon={Factory}
            title="Anti-Pollution Programs"
            description="Republic Act No. 8749, or the Philippine Clean Air Act of 1999, is a landmark law designed to protect and improve air quality in the Philippines. It provides a comprehensive framework for preventing, controlling, and mitigating air pollution from mobile and stationary sources to safeguard public health and the environment. The Act establishes air quality standards for key pollutants such as particulate matter, sulfur dioxide, carbon monoxide, nitrogen oxides, and ozone, and mandates continuous monitoring and enforcement.
              The law integrates air quality management into national and local planning, ensuring that pollution control is prioritized in both urban and rural areas. It assigns responsibilities to government agencies, particularly the Department of Environment and Natural Resources (DENR), to enforce standards, regulate industrial emissions, and promote cleaner technologies. The Act also encourages public participation and imposes penalties on violators, including fines and permit suspensions or revocations. Through these measures, the Clean Air Act aims to reduce pollution, protect public health, and promote sustainable development in the Philippines."
            delay={500}
          />
        </div>

        {/* PSU Lubao Campus Section */}
        <div className="animate-fadeInUp">
          <div className="relative bg-white rounded-3xl p-12 shadow-2xl border-4 border-green-500">
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg">
              Campus Action Plan
            </div>
            
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <Leaf className="w-10 h-10 mr-4 text-green-600" />
              Application of Solutions at PSU Lubao Campus
            </h3>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Campus Initiatives</h4>
                <p className="text-gray-700">Schools in the Philippines are increasingly adopting strategies to reduce their environmental impact and promote sustainability. Key initiatives include plastic recycling programs, composting food waste, and reducing single-use disposable items like plastic cutlery, cups, and bottles. College campuses can further support sustainability by offering donation programs and e-waste recycling drives during moving season, helping keep unwanted items and electronics out of landfills.
                To support these efforts, campuses can implement clear recycling plans:
                •Coordinate with local recyclers to identify acceptable materials.
                •Place labeled bins in high-traffic areas.
                •Organize volunteer teams to collect and track recyclables weekly.
               Investments in tree planting on campus provide additional benefits, including improved air quality, energy savings from reduced heating and cooling, and increased property value. Sustainable infrastructure and initiatives not only enhance the campus environment but also allow schools to redirect cost savings to educational programs.</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Student Participation</h4>
                <p className="text-gray-700">Students play a vital role in making campus sustainability initiatives successful. Simple habits like using reusable water bottles, coffee cups, and utensils, packing lunch in reusable containers, and avoiding plastic straws or bags can collectively reduce campus waste. Students can also engage in practical activities such as community clean-ups, recycling drives, and campaigns to reduce single-use plastics.
                Participation helps students develop critical thinking, teamwork, and leadership skills while fostering a sense of responsibility toward the environment. By taking part in composting programs, recycling, and energy conservation projects, students not only contribute to a cleaner campus but also gain hands-on experience in sustainable practices that they can apply in their personal lives.</p>
              </div>
              
              <div className="bg-teal-50 rounded-xl p-6 hover:bg-teal-100 transition-colors">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Community Engagement</h4>
                <p className="text-gray-700">Sustainability on campus extends beyond the school itself, influencing the broader community. Universities can lead community-driven projects, collaborate with local partners, and develop eco-friendly innovations in collaboration with organizations like IPUs and Fab Labs. These initiatives can enhance the university’s visibility in rankings for innovation and sustainability, while inspiring local residents and businesses to adopt similar practices.
                Through education and outreach, students and staff can promote environmental awareness in surrounding communities, participate in tree planting programs, and share best practices in waste management and energy conservation. These efforts help create cleaner, healthier, and more resilient communities, demonstrating that protecting the environment is not only a campus responsibility but a shared social commitment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-900 to-teal-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-8 h-8 text-green-300" />
              <span className="font-bold text-xl">EcoAwareness</span>
            </div>
            <p className="text-green-200">
              Together, let's take care of our environment for a better future.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-green-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#what-is" className="text-green-200 hover:text-white transition-colors">Climate Change Info</a></li>
              <li><a href="#solutions" className="text-green-200 hover:text-white transition-colors">Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <p className="text-green-200">
              Pampanga State Agricultural University<br />
              Lubao Campus<br />
              Lubao, Pampanga
            </p>
          </div>
        </div>
        
        <div className="border-t border-green-700 pt-8 text-center text-green-200">
          <p>&copy; 2025 EcoAwareness Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="font-sans">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
      <Navbar />
      <Hero />
      <WhatIsSection />
      <SolutionsSection />
      <Footer />
    </div>
  );
}

export default App;