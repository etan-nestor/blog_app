/* eslint-disable react/prop-types */
import CardPostMin from "./CardPostMin";

const CardPostList = ({ cards }) => {
    // Définit combien de cartes afficher par ligne
    const postsPerRow = 4;
    const rows = [];

    // Découpe le tableau en plusieurs sous-tableaux pour créer des lignes
    for (let i = 0; i < cards.length; i += postsPerRow) {
        rows.push(cards.slice(i, i + postsPerRow));
    }

    return (
        <div className="mt-[80px] p-4 overflow-y-auto max-h-screen">
            <div className="flex flex-col gap-4 justify-center items-center">
                {rows.map((row, index) => (
                    <div key={index} className="flex gap-4">
                        {row.map((card) => (
                            <CardPostMin
                                key={card.id}
                                id={card.id}
                                image={card.image}
                                title={card.title.substring(0, 50) + (card.title.length > 50 ? "..." : "")}
                                date={new Intl.DateTimeFormat("fr-FR", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                }).format(new Date(card.date))}
                                author="Nestor C."
                                comments={card.comments}
                                likes={card.likes}
                                shares={card.shares}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardPostList;
