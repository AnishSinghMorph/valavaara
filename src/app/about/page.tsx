"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Trophy, Star, Newspaper, Award, Building2, MapPin } from "lucide-react";

// Import all components
import {
    SmoothScrollProvider,
    HeroSection,
    Section,
    SectionHeader,
    AnimatedSection,
    QuoteCard,

    MediaCard,
    AwardCard,
    NavigationDots,
    NavigationMenu,
    ScrollProgress,
    Marquee,
    LoadingScreen,
    Divider,
    GlowDivider,
    BackgroundOrb,
    Grid,
    HorizontalScroll,
    CTASection,
    Footer,
    ScrollVideoBackground,
} from "./components";

// Navigation items - simplified for about page
const navItems = [
    { id: "hero", label: "Home" },
    { id: "synopsis", label: "Synopsis" },
    { id: "about", label: "About Morph" },
    { id: "awards", label: "Awards" },
    { id: "press", label: "Press Coverage" },
    { id: "value", label: "Why Valavaara" },
];

export default function AboutPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SmoothScrollProvider>
            {/* Scroll-bound Video Background */}
            <ScrollVideoBackground />

            {/* Loading Screen */}
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen movieTitle="VALAVAARA" />}
            </AnimatePresence>

            {/* Navigation */}
            <NavigationMenu items={navItems} movieTitle="VALAVAARA" />
            <NavigationDots items={navItems} />
            <ScrollProgress />

            {/* ============================================ */}
            {/* HERO SECTION */}
            {/* ============================================ */}
            <HeroSection
                title="VALAVAARA"
                subtitle="A heartwarming coming-of-age drama about familial bonds, sibling rivalry, and the emotional journey of growing up in rural Karnataka."
                badge="✨ U Certified • Family Entertainment • Best Children's Film Award"
                transparent={true}
            >
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <a href="#synopsis" className="pitch-btn-primary">
                        Explore the Story
                    </a>
                    <a href="#about" className="pitch-btn-outline">
                        About Morph Productions
                    </a>
                </div>
            </HeroSection>

            {/* ============================================ */}
            {/* SYNOPSIS SECTION */}
            {/* ============================================ */}
            <Section id="synopsis" transparent={true}>
                <BackgroundOrb color="gold" size={400} top="10%" right="-10%" />

                <SectionHeader
                    label="The Story"
                    title="Synopsis"
                    subtitle="A touching narrative set in the picturesque landscape of Sakleshpur, Karnataka"
                />

                <AnimatedSection animation="fadeUp" delay={0.2}>
                    <div
                        className="pitch-glass-card"
                        style={{
                            padding: "48px",
                            maxWidth: "900px",
                            margin: "0 auto",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                            <MapPin size={24} style={{ color: "var(--pitch-accent-primary)" }} />
                            <span className="pitch-label" style={{ fontSize: "1rem" }}>Sakleshpur, Karnataka</span>
                        </div>

                        <p className="pitch-text" style={{ fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "24px" }}>
                            <strong style={{ color: "var(--pitch-accent-primary)" }}>Valavaara</strong> is a coming-of-age drama about familial bonds, sibling rivalry, and responsibility.
                            The story follows <strong>Kundeshi</strong>, a young boy from a struggling farming family, who feels overshadowed by his younger brother, <strong>Kosudi</strong>, due to their father's favoritism.
                        </p>

                        <GlowDivider />

                        <p className="pitch-text" style={{ fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "24px" }}>
                            One day, the brothers take their pregnant cow for a walk, only for it to wander off and destroy a local farmer's field.
                            The farmer traps the cow in a cowshed, and the brothers, unaware of its fate, search for it.
                        </p>

                        <p className="pitch-text" style={{ fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "24px" }}>
                            Kundeshi must raise money to free the cow before his father returns, facing challenges that force him to confront his own feelings of inadequacy and fractured family ties.
                        </p>

                        <GlowDivider />

                        <p className="pitch-text" style={{ fontSize: "1.25rem", lineHeight: "1.8", fontStyle: "italic", textAlign: "center", color: "var(--pitch-accent-gold)" }}>
                            A poignant tale about responsibility, family loyalty, and the emotional journey of growing up in rural life.
                        </p>
                    </div>
                </AnimatedSection>


            </Section>

            {/* ============================================ */}
            {/* ABOUT MORPH PRODUCTION */}
            {/* ============================================ */}
            <Section id="about" transparent={true}>
                <BackgroundOrb color="purple" size={350} top="20%" left="-10%" />

                <SectionHeader
                    label="The Makers"
                    title="About Morph Productions"
                    subtitle="A production house committed to quality storytelling"
                />

                <AnimatedSection animation="fadeUp">
                    <div
                        className="pitch-glass-card"
                        style={{
                            padding: "48px",
                            maxWidth: "900px",
                            margin: "0 auto",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                            <Building2 size={28} style={{ color: "var(--pitch-accent-primary)" }} />
                            <span className="pitch-title-sm" style={{ margin: 0 }}>Morph Productions</span>
                        </div>

                        <h3 className="pitch-title-sm pitch-gradient-gold" style={{ marginBottom: "16px" }}>
                            Our Vision: Engineering the Future of Storytelling
                        </h3>

                        <p className="pitch-text" style={{ fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "24px" }}>
                            At Morph Productions, we believe the most powerful stories are told with a whisper, not a shout.
                            Inspired by the depth and subtlety of New Wave Malayalam cinema, we aim to bring the same narrative
                            sophistication to the Kannada film industry and beyond.
                        </p>

                        <p className="pitch-text" style={{ fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "24px" }}>
                            With an <strong style={{ color: "var(--pitch-accent-primary)" }}>18-year legacy in Creative Technology</strong>,
                            we remove the technical friction that often stands between a director's vision and the screen. Through AI-driven
                            pre-visualization, immersive CGI, and smart production workflows, we empower storytellers to take creative
                            risks—while delivering visually world-class, deeply engaging cinema.
                        </p>

                        <GlowDivider />

                        <p className="pitch-text" style={{ fontSize: "1.25rem", lineHeight: "1.8", fontStyle: "italic", textAlign: "center", color: "var(--pitch-accent-gold)", marginBottom: "24px" }}>
                            We don't just build films.<br />
                            We engineer the bridge between intellectual depth and cinematic delight.
                        </p>

                        <GlowDivider />

                        <h4 className="pitch-title-sm" style={{ marginBottom: "16px", marginTop: "32px" }}>
                            Who We Are
                        </h4>

                        <p className="pitch-text" style={{ fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "24px" }}>
                            Morph is a <strong style={{ color: "var(--pitch-accent-primary)" }}>Creative Technology Company</strong> that
                            produces 'Next Gen' experiences for brands and enterprises around the world.
                        </p>

                        <p className="pitch-text" style={{ fontSize: "1.125rem", lineHeight: "1.8" }}>
                            We are a multidisciplinary team of Artists, Technology Experts, Brand Strategists, Usability Experts,
                            Software Engineers, and Creative Thinkers. Our focus is to create dynamic solutions across multiple platforms,
                            addressing our client's challenges. We are committed to delivering solutions to support our client's marketing
                            and business objectives <strong>since 2008</strong>.
                        </p>
                    </div>
                </AnimatedSection>

                <Divider />

                {/* Company Highlights */}
                <Grid columns={3}>
                    <QuoteCard
                        quote="Inspired by New Wave Malayalam cinema - bringing narrative sophistication to Kannada film industry."
                        author="Morph Productions"
                        role="Our Inspiration"
                        delay={0}
                    />
                    <QuoteCard
                        quote="AI-driven pre-visualization, immersive CGI, smart workflows - empowering storytellers to take creative risks."
                        author="Morph Productions"
                        role="Our Technology"
                        delay={0.1}
                    />
                    <QuoteCard
                        quote="18 years of Creative Technology excellence - bridging intellectual depth with cinematic delight."
                        author="Morph Productions"
                        role="Our Legacy"
                        delay={0.2}
                    />
                </Grid>
            </Section>

            {/* ============================================ */}
            {/* AWARDS & RECOGNITION */}
            {/* ============================================ */}
            <Section id="awards" transparent={true}>
                <BackgroundOrb color="gold" size={400} top="30%" right="-10%" />

                <SectionHeader
                    label="Excellence Recognized"
                    title="Awards & Recognition"
                    subtitle="Honored for outstanding achievement in cinema"
                />

                <Grid columns={3}>
                    <AwardCard
                        icon={<Trophy size={48} style={{ color: "var(--pitch-accent-gold)" }} />}
                        title="Best Children's Film"
                        category="17th International Film Festival"
                        year="Hyderabad 2025"
                        delay={0}
                    />
                    <AwardCard
                        icon={<Award size={48} style={{ color: "var(--pitch-accent-primary)" }} />}
                        title="U Certified"
                        category="Family Entertainment"
                        year="CBFC"
                        delay={0.1}
                    />
                    <AwardCard
                        icon={<Star size={48} style={{ color: "var(--pitch-accent-gold)" }} />}
                        title="Critical Acclaim"
                        category="4.5/5 Average Rating"
                        year="Newspaper Critics"
                        delay={0.2}
                    />
                </Grid>

                <GlowDivider />

                <AnimatedSection animation="scaleUp">
                    <div className="pitch-glass-card" style={{ padding: "32px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                        <Trophy size={48} style={{ color: "var(--pitch-accent-gold)", marginBottom: "16px" }} />
                        <h3 className="pitch-title-md pitch-gradient-gold" style={{ marginBottom: "16px" }}>
                            🏆 A Milestone Moment 🏆
                        </h3>
                        <p className="pitch-text" style={{ fontSize: "1.125rem" }}>
                            Valavaara wins <strong>Best Children's Film</strong> at the 17th International Film Festival, Hyderabad 2025
                        </p>
                    </div>
                </AnimatedSection>
            </Section>

            {/* ============================================ */}
            {/* PRESS COVERAGE */}
            {/* ============================================ */}
            <Section id="press" transparent={true}>
                <SectionHeader
                    label="Press Coverage"
                    title="Media Reviews"
                    subtitle="Critical acclaim from leading publications"
                />

                <AnimatedSection animation="fadeUp">
                    <h3 className="pitch-title-md" style={{ textAlign: "center", marginBottom: "32px" }}>
                        <Newspaper size={32} style={{ marginRight: "12px", verticalAlign: "middle" }} />
                        Featured In
                    </h3>
                </AnimatedSection>

                <HorizontalScroll>
                    {[
                        { outlet: "Leading Newspaper", headline: "A heartwarming tale the whole family will love" },
                        { outlet: "Film Critic", headline: "Outstanding performances by the young actors" },
                        { outlet: "Entertainment Weekly", headline: "U-certified gem for family viewing" },
                        { outlet: "Regional Press", headline: "Kannada cinema at its finest" },
                    ].map((item, i) => (
                        <MediaCard
                            key={i}
                            outlet={item.outlet}
                            headline={item.headline}
                            type="newspaper"
                            delay={i * 0.1}
                        />
                    ))}
                </HorizontalScroll>
            </Section>

            {/* ============================================ */}
            {/* VALUE PROPOSITION */}
            {/* ============================================ */}
            <Section id="value" transparent={true}>
                <BackgroundOrb color="gold" size={500} top="20%" left="30%" />

                <SectionHeader
                    label="Why Valavaara"
                    title="Value Proposition"
                    subtitle="The perfect family film"
                />

                <AnimatedSection animation="fadeUp">
                    <div
                        className="pitch-glass-card"
                        style={{
                            padding: "48px",
                            maxWidth: "1000px",
                            margin: "0 auto",
                        }}
                    >
                        <Grid columns={2}>
                            <div>
                                <h4 className="pitch-title-sm pitch-gradient-gold" style={{ marginBottom: "16px" }}>
                                    Universal Appeal
                                </h4>
                                <p className="pitch-text">
                                    U-certified family entertainment that appeals to viewers of all ages,
                                    ensuring broad demographic reach.
                                </p>
                            </div>
                            <div>
                                <h4 className="pitch-title-sm pitch-gradient-gold" style={{ marginBottom: "16px" }}>
                                    Award Winning
                                </h4>
                                <p className="pitch-text">
                                    Best Children's Film at the 17th International Film Festival, Hyderabad -
                                    recognized for excellence in storytelling.
                                </p>
                            </div>
                        </Grid>

                        <Divider />

                        <Grid columns={2}>
                            <div>
                                <h4 className="pitch-title-sm pitch-gradient-gold" style={{ marginBottom: "16px" }}>
                                    Emotional Connection
                                </h4>
                                <p className="pitch-text">
                                    Heartwarming story that creates lasting emotional impact and
                                    encourages repeat viewing with family.
                                </p>
                            </div>
                            <div>
                                <h4 className="pitch-title-sm pitch-gradient-gold" style={{ marginBottom: "16px" }}>
                                    Authentic Storytelling
                                </h4>
                                <p className="pitch-text">
                                    Genuine portrayal of rural Karnataka life that resonates with
                                    audiences seeking meaningful content.
                                </p>
                            </div>
                        </Grid>
                    </div>
                </AnimatedSection>

                <GlowDivider />

                {/* Marquee */}
                <Marquee
                    items={[
                        "BEST CHILDREN'S FILM",
                        "U CERTIFIED",
                        "FAMILY ENTERTAINMENT",
                        "CRITICAL ACCLAIM",
                        "AWARD WINNING",
                    ]}
                />
            </Section>

            {/* ============================================ */}
            {/* CALL TO ACTION */}
            {/* ============================================ */}
            <CTASection
                title="Experience Valavaara"
                subtitle="A heartwarming journey that the whole family will cherish"
                secondaryButton={{
                    label: "Download Press Kit",
                    href: "/press-kit",
                }}
            />

            {/* ============================================ */}
            {/* FOOTER */}
            {/* ============================================ */}
            <Footer
                companyName="Morph Productions"
                contactEmail="contact@morphproductions.in"
            />
        </SmoothScrollProvider>
    );
}
