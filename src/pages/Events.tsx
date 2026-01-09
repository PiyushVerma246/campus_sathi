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
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
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
            <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[85vh] flex items-center">
                {/* Enhanced Background Elements */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

                {/* Floating Animated Icons */}
                <motion.div
                    className="absolute top-20 right-[10%] text-primary/20"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Trophy className="h-16 w-16" />
                </motion.div>
                <motion.div
                    className="absolute bottom-32 left-[8%] text-purple-500/20"
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Sparkles className="h-20 w-20" />
                </motion.div>
                <motion.div
                    className="absolute top-1/3 right-[5%] text-primary/15"
                    animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Users className="h-14 w-14" />
                </motion.div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div>
                            <ScrollReveal>
                                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
                                    <Calendar className="h-4 w-4 text-primary animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Campus Life</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                                    Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Experiences</span>
                                </h1>
                                <p className="text-xl text-foreground/60 max-w-2xl font-light leading-relaxed mb-10">
                                    Discover the pulse of the campus. From high-energy hackathons to immersive cultural festivals, never miss a moment.
                                </p>

                                {/* Statistics Cards */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md border border-primary/20 rounded-2xl p-6 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Calendar className="h-8 w-8 text-primary" />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="h-2 w-2 bg-primary rounded-full"
                                            />
                                        </div>
                                        <div className="text-3xl font-black text-foreground mb-1">12+</div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-foreground/60">Total Events</div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Building2 className="h-8 w-8 text-purple-500" />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                                className="h-2 w-2 bg-purple-500 rounded-full"
                                            />
                                        </div>
                                        <div className="text-3xl font-black text-foreground mb-1">6</div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-foreground/60">Categories</div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-md border border-primary/20 rounded-2xl p-6 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Users className="h-8 w-8 text-primary" />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                                className="h-2 w-2 bg-primary rounded-full"
                                            />
                                        </div>
                                        <div className="text-3xl font-black text-foreground mb-1">3K+</div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-foreground/60">Attendees</div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-gradient-to-br from-purple-500/10 to-primary/10 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Sparkles className="h-8 w-8 text-purple-500" />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                                className="h-2 w-2 bg-purple-500 rounded-full"
                                            />
                                        </div>
                                        <div className="text-3xl font-black text-foreground mb-1">8</div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-foreground/60">This Month</div>
                                    </motion.div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right Column - Featured Event Card */}
                        <ScrollReveal delay={0.2}>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                <Card className="bg-foreground/[0.02] border-foreground/10 backdrop-blur-xl overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10 group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative h-80 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                                        <img
                                            src={events[0].image}
                                            alt={events[0].title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-6 left-6 z-20">
                                            <Badge className="bg-primary/90 text-white border-0 backdrop-blur-md px-4 py-2 font-bold uppercase tracking-wider text-xs">
                                                Featured Event
                                            </Badge>
                                        </div>
                                        <div className="absolute bottom-6 left-6 right-6 z-20">
                                            <div className="flex items-center text-white/80 text-sm font-medium mb-3">
                                                <Clock className="h-4 w-4 mr-2" />
                                                {events[0].time}
                                            </div>
                                            <h3 className="text-4xl font-black text-white leading-none tracking-tight mb-4">
                                                {events[0].title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-white/70 text-sm">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    {events[0].date}
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-2" />
                                                    {events[0].location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-8">
                                        <p className="text-foreground/60 text-base leading-relaxed mb-6">
                                            {events[0].description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-foreground/60">
                                                <Users className="h-5 w-5 mr-2 text-primary" />
                                                <span className="font-bold">{events[0].attendees} Expected</span>
                                            </div>
                                            <Button className="h-12 px-8 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold tracking-wide transition-all group-hover:scale-105">
                                                <Ticket className="h-4 w-4 mr-2" />
                                                Register Now
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Events Grid Section */}
            <section className="relative py-20 pb-32 px-6 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-1/4 right-0 -mr-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 left-0 -ml-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header */}
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
                                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Browse Events</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Perfect Event</span>
                            </h2>
                            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">
                                Filter by category to discover events that match your interests
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Enhanced Category Tabs */}
                    <ScrollReveal delay={0.2}>
                        <Tabs defaultValue="All" className="w-full mb-16" onValueChange={setActiveTab}>
                            <div className="flex justify-center">
                                <TabsList className="bg-gradient-to-br from-foreground/5 to-foreground/[0.02] border border-foreground/10 rounded-2xl p-2 inline-flex flex-wrap gap-2 backdrop-blur-xl shadow-xl">
                                    {categories.map((cat) => (
                                        <TabsTrigger
                                            key={cat}
                                            value={cat}
                                            className="rounded-xl px-6 py-3 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 transition-all duration-300 hover:bg-foreground/5"
                                        >
                                            {cat}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>
                        </Tabs>
                    </ScrollReveal>

                    {/* Enhanced Events Grid with Modern Aesthetic Cards */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {filteredEvents.map((event, index) => {
                            // Category-specific gradient colors
                            const categoryGradients = {
                                'Hackathon': 'from-blue-500 via-cyan-500 to-teal-500',
                                'Cultural': 'from-purple-500 via-pink-500 to-rose-500',
                                'Tech': 'from-cyan-500 via-blue-500 to-indigo-500',
                                'Workshops': 'from-green-500 via-emerald-500 to-teal-500',
                                'Business': 'from-orange-500 via-amber-500 to-yellow-500'
                            };

                            const categoryAccents = {
                                'Hackathon': 'bg-blue-500',
                                'Cultural': 'bg-purple-500',
                                'Tech': 'bg-cyan-500',
                                'Workshops': 'bg-green-500',
                                'Business': 'bg-orange-500'
                            };

                            const categoryGlows = {
                                'Hackathon': 'group-hover:shadow-blue-500/50',
                                'Cultural': 'group-hover:shadow-purple-500/50',
                                'Tech': 'group-hover:shadow-cyan-500/50',
                                'Workshops': 'group-hover:shadow-green-500/50',
                                'Business': 'group-hover:shadow-orange-500/50'
                            };

                            return (
                                <ScrollReveal key={event.id} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -16, scale: 1.03 }}
                                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                        className="h-full"
                                    >
                                        <Card className={`relative overflow-hidden rounded-[2rem] border-0 h-full flex flex-col group bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-2xl shadow-xl hover:shadow-3xl ${categoryGlows[event.category as keyof typeof categoryGlows]} transition-all duration-700`}>
                                            {/* Glassmorphism overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                            {/* Animated gradient border */}
                                            <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-r ${categoryGradients[event.category as keyof typeof categoryGradients]} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 pointer-events-none`} />
                                            <div className={`absolute inset-[1px] rounded-[2rem] bg-gradient-to-br from-background/95 via-background/90 to-background/85 backdrop-blur-2xl`} />

                                            {/* Content wrapper */}
                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Image Section with Creative Treatment */}
                                                <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
                                                    {/* Gradient overlay with blur effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />

                                                    {/* Image with parallax effect */}
                                                    <motion.div
                                                        className="absolute inset-0"
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                                    >
                                                        <img
                                                            src={event.image}
                                                            alt={event.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {/* Color overlay matching category */}
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[event.category as keyof typeof categoryGradients]} opacity-20 mix-blend-overlay`} />
                                                    </motion.div>

                                                    {/* Floating Category Badge */}
                                                    <motion.div
                                                        className="absolute top-5 right-5 z-20"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className={`relative px-4 py-2 rounded-2xl bg-gradient-to-r ${categoryGradients[event.category as keyof typeof categoryGradients]} shadow-2xl`}>
                                                            <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-md" />
                                                            <span className="relative text-white font-black uppercase tracking-widest text-[10px]">
                                                                {event.category}
                                                            </span>
                                                        </div>
                                                    </motion.div>

                                                    {/* Attendee Count Badge */}
                                                    <motion.div
                                                        className="absolute top-5 left-5 z-20"
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="relative px-4 py-2 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-xl">
                                                            <div className="flex items-center gap-2">
                                                                <Users className="h-4 w-4 text-primary" />
                                                                <span className="text-white font-bold text-sm">{event.attendees}</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Decorative accent line */}
                                                    <motion.div
                                                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryGradients[event.category as keyof typeof categoryGradients]} z-20`}
                                                        initial={{ scaleX: 0 }}
                                                        whileInView={{ scaleX: 1 }}
                                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                                    />
                                                </div>

                                                {/* Content Section with Enhanced Layout */}
                                                <CardContent className="p-7 flex-1 flex flex-col space-y-5">
                                                    {/* Title */}
                                                    <motion.h3
                                                        className="text-2xl font-black tracking-tight leading-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all duration-500"
                                                        whileHover={{ x: 3 }}
                                                    >
                                                        {event.title}
                                                    </motion.h3>

                                                    {/* Time Badge with Icon */}
                                                    <motion.div
                                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-foreground/5 to-foreground/[0.02] border border-foreground/10 backdrop-blur-sm w-fit"
                                                        whileHover={{ scale: 1.05, x: 5 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <Clock className="h-4 w-4 text-primary" />
                                                        <span className="text-sm font-bold text-foreground/80">{event.time}</span>
                                                    </motion.div>

                                                    {/* Info Grid */}
                                                    <div className="grid grid-cols-1 gap-3">
                                                        <motion.div
                                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 backdrop-blur-sm"
                                                            whileHover={{ x: 5, backgroundColor: "rgba(var(--primary), 0.1)" }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <div className={`p-2 rounded-lg ${categoryAccents[event.category as keyof typeof categoryAccents]}/10`}>
                                                                <Calendar className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <span className="text-sm font-semibold text-foreground/70">{event.date}</span>
                                                        </motion.div>

                                                        <motion.div
                                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/10 backdrop-blur-sm"
                                                            whileHover={{ x: 5, backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <div className="p-2 rounded-lg bg-purple-500/10">
                                                                <MapPin className="h-4 w-4 text-purple-500" />
                                                            </div>
                                                            <span className="text-sm font-semibold text-foreground/70">{event.location}</span>
                                                        </motion.div>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2 flex-1">
                                                        {event.description}
                                                    </p>
                                                </CardContent>

                                                {/* Footer with Enhanced CTA */}
                                                <CardFooter className="p-7 pt-0">
                                                    <motion.div
                                                        className="w-full"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <Button className={`w-full h-14 rounded-2xl bg-gradient-to-r ${categoryGradients[event.category as keyof typeof categoryGradients]} text-white font-black tracking-wide transition-all duration-500 shadow-lg hover:shadow-2xl ${categoryGlows[event.category as keyof typeof categoryGlows]} border-0 relative overflow-hidden group/btn`}>
                                                            {/* Shine effect */}
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                                initial={{ x: "-100%" }}
                                                                whileHover={{ x: "100%" }}
                                                                transition={{ duration: 0.6 }}
                                                            />
                                                            <span className="relative flex items-center justify-center gap-2">
                                                                <Ticket className="h-5 w-5" />
                                                                Register Now
                                                                <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                            </span>
                                                        </Button>
                                                    </motion.div>
                                                </CardFooter>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </ScrollReveal>
                            );
                        })}
                    </motion.div>

                    {/* Enhanced Empty State */}
                    {filteredEvents.length === 0 && (
                        <motion.div
                            className="text-center py-32"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Sparkles className="h-24 w-24 mx-auto mb-6 text-primary/40" />
                            </motion.div>
                            <h3 className="text-3xl font-black uppercase tracking-wider mb-4 text-foreground/70">
                                No Events Found
                            </h3>
                            <p className="text-lg text-foreground/50 mb-8">
                                Try selecting a different category to explore more events
                            </p>
                            <Button
                                onClick={() => setActiveTab("All")}
                                className="h-12 px-8 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold"
                            >
                                View All Events
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};
