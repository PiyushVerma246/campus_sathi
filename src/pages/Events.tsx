import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Building2, Ticket, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
    {
        id: 1,
        title: "TechNova 2024",
        category: "Hackathon",
        date: "March 15-17, 2024",
        time: "48 Hours",
        location: "Innovation Hub",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=800",
        description: "The annual flagship hackathon. Build the future with AI, Blockchain, and IoT. Over $10k in prizes.",
        attendees: "500+"
    },
    {
        id: 2,
        title: "Cultural Mosaic",
        category: "Cultural",
        date: "April 05, 2024",
        time: "10:00 AM - 10:00 PM",
        location: "Main Auditorium",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        description: "A celebration of diversity through music, dance, and art. Experience performances from around the globe.",
        attendees: "1200+"
    },
    {
        id: 3,
        title: "Future of AI Workshop",
        category: "Workshops",
        date: "March 22, 2024",
        time: "2:00 PM - 5:00 PM",
        location: "Lecture Hall B",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        description: "Deep dive into Large Language Models and Generative AI with industry experts from Google and Microsoft.",
        attendees: "200+"
    },
    {
        id: 4,
        title: "RoboWars Championship",
        category: "Tech",
        date: "April 12, 2024",
        time: "9:00 AM - 6:00 PM",
        location: "Sports Complex",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", // Reusing image for demo, ideal would be robot image
        description: "Witness the ultimate battle of bots. Teams compete for glory in this high-octane engineering showdown.",
        attendees: "800+"
    },
    {
        id: 5,
        title: "Startup Summit",
        category: "Business",
        date: "March 28, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Conference Center",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
        description: "Pitch your ideas to venture capitalists and angel investors. Network with successful alumni entrepreneurs.",
        attendees: "300+"
    },
    {
        id: 6,
        title: "CodeSprint",
        category: "Hackathon",
        date: "April 20, 2024",
        time: "12 Hours",
        location: "Computer Labs",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        description: "Competitive programming contest. Solve algorithmic challenges and win exciting gadgets.",
        attendees: "150+"
    }
];

const categories = ["All", "Hackathon", "Cultural", "Tech", "Workshops", "Business"];

export const Events = () => {
    const [activeTab, setActiveTab] = useState("All");

    const filteredEvents = activeTab === "All"
        ? events
        : events.filter(e => e.category === activeTab);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navigation />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
                            <Calendar className="h-4 w-4 text-primary animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Campus Life</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Experiences</span>
                        </h1>
                        <p className="text-xl text-foreground/60 max-w-2xl font-light leading-relaxed">
                            Discover the pulse of the campus. From high-energy hackathons to immersive cultural festivals, never miss a moment.
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            {/* Events Grid Section */}
            <section className="py-12 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal delay={0.2}>
                        <Tabs defaultValue="All" className="w-full mb-12" onValueChange={setActiveTab}>
                            <TabsList className="bg-foreground/5 border border-foreground/10 rounded-full h-14 p-1 inline-flex w-full md:w-auto overflow-x-auto no-scrollbar">
                                {categories.map((cat) => (
                                    <TabsTrigger
                                        key={cat}
                                        value={cat}
                                        className="rounded-full px-6 h-12 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                                    >
                                        {cat}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event, index) => (
                            <ScrollReveal key={event.id} delay={index * 0.1}>
                                <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                                    <Card className="bg-foreground/[0.02] border-foreground/10 backdrop-blur-sm overflow-hidden rounded-[2rem] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group h-full flex flex-col">
                                        <div className="relative h-64 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <Badge className="bg-primary/90 text-white border-0 backdrop-blur-md px-3 py-1 font-bold uppercase tracking-wider text-[10px]">
                                                    {event.category}
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-4 left-4 z-20">
                                                <div className="flex items-center text-white/80 text-xs font-medium mb-1">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {event.time}
                                                </div>
                                                <h3 className="text-2xl font-black text-white leading-none tracking-tight">{event.title}</h3>
                                            </div>
                                        </div>

                                        <CardContent className="p-6 flex-1 space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center text-foreground/60 text-sm font-medium">
                                                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                                                    {event.date}
                                                </div>
                                                <div className="flex items-center text-foreground/60 text-sm font-medium">
                                                    <Users className="h-4 w-4 mr-2 text-primary" />
                                                    {event.attendees}
                                                </div>
                                            </div>

                                            <div className="flex items-start text-foreground/60 text-sm font-medium">
                                                <MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                                {event.location}
                                            </div>

                                            <p className="text-foreground/50 text-sm leading-relaxed line-clamp-3">
                                                {event.description}
                                            </p>
                                        </CardContent>

                                        <CardFooter className="p-6 pt-0">
                                            <Button className="w-full h-12 rounded-xl bg-foreground text-background hover:bg-primary hover:text-white font-bold tracking-wide transition-all group-hover:scale-[1.02]">
                                                <Ticket className="h-4 w-4 mr-2" />
                                                Register Now
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-20 opacity-50">
                            <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary/40" />
                            <p className="text-xl font-bold uppercase tracking-widest">No events found in this category</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};
