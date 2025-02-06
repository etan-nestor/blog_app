import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import on from '../assets/2.jpg';
import blg from '../assets/1.jpg';
import LoaderPage from '../components/loader/LoaderPage';

const About = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    }, []);

    return (
        <div className="bg-[#071738] text-white min-h-screen">
            {loading ? (
                <LoaderPage />  // Affiche le loader pendant 2 secondes
            ) : (
                <>
                    {/* Section Open Numeric */}
                    <section className="container mx-auto px-6 py-16 text-center">
                        <motion.h2
                            className="text-5xl font-bold mt-2 mb-6 text-orange-600"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Open Numeric
                        </motion.h2>
                        <p className="text-xl max-w-3xl mx-auto mb-6 font-bold">
                            Open Numeric est une structure spécialisée dans les services numériques : développement web, mobile et logiciel, installation et réparation d&#39;imprimantes et photocopieuses, ainsi que la formation en informatique.
                        </p>
                        <p className="text-xl max-w-3xl mx-auto mb-6">
                            Nous nous engageons à fournir des solutions innovantes et de qualité pour répondre aux besoins des entreprises et des particuliers. Que vous ayez besoin d&#39;une application personnalisée, d&#39;une assistance technique pour vos équipements, ou d&#39;une formation approfondie en informatique, Open Numeric est là pour vous accompagner.
                        </p>
                        <motion.img
                            src={on}
                            alt="Open Numeric Services"
                            className="w-[30rem] cursor-pointer max-w-3xl mx-auto mt-6 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        />
                    </section>

                    {/* Section MyBlog */}
                    <section className="container mx-auto px-6 py-16 text-center">
                        <motion.h2
                            className="text-5xl font-bold mb-6 text-blue-600"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            MyBlog
                        </motion.h2>
                        <p className="text-xl max-w-3xl mx-auto mb-6 font-bold">
                            MyBlog est une plateforme minimaliste qui vous permet d&#39;enrichir vos connaissances et compétences en vous rappelant l&#39;essentiel dans plusieurs domaines.
                        </p>
                        <p className="text-xl max-w-3xl mx-auto mb-6">
                            Nous couvrons une variété de sujets allant des technologies émergentes aux conseils pratiques pour améliorer votre quotidien. Notre objectif est de rendre l&#39;apprentissage accessible et agréable, avec des articles concis, bien structurés et faciles à comprendre.
                        </p>
                        <motion.img
                            src={blg}
                            alt="MyBlog Platform"
                            className="cursor-pointer w-[20rem] mx-auto mt-6 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        />
                    </section>
                </>
            )}
        </div>
    );
};

export default About;
