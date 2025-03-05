/* eslint-disable react/prop-types */
import CardPostMin from "./CardPostMin";

const CardPostList = ({ cards }) => {
    return (
        <div className="mt-10 p-4 max-h-screen overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
                {cards.map((card) => (
                    <CardPostMin
                        key={card.id}
                        id={card.id}
                        image={card.image}
                        title={card.title.length > 50 ? card.title.substring(0, 50) + "..." : card.title}
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
        </div>
    );
};

export default CardPostList;
