import React from "react";
import StoryCard from "./StoryCard";

const Stories = () => {
  const stories = [
    {
      name: "Rally",
      src: "https://i.pinimg.com/564x/b1/81/90/b1819024265433df4941bba25c05b92a.jpg",
      profile:
        "https://i.pinimg.com/564x/a9/50/49/a95049064a19b912690f3013012049e1.jpg",
    },
    {
      name: "Jeff Bezoz",
      src: "https://i.pinimg.com/736x/10/93/5f/10935f1f399993ffa1ee6f7919113311.jpg",
      profile:
        "https://i.pinimg.com/564x/a9/50/49/a95049064a19b912690f3013012049e1.jpg",
    },
    {
      name: "Rally",
      src: "https://i.pinimg.com/736x/a8/0f/24/a80f24b177913aa5bf2e99d5c0437a28.jpg",
      profile:
        "https://i.pinimg.com/564x/a9/50/49/a95049064a19b912690f3013012049e1.jpg",
    },
    {
      name: "Jeff Bezoz",
      src: "https://i.pinimg.com/564x/72/b8/a2/72b8a2f7aaa41d8532fcf87918428c52.jpg",
      profile:
        "https://i.pinimg.com/564x/a9/50/49/a95049064a19b912690f3013012049e1.jpg",
    },
    {
      name: "Rally",
      src: "https://i.pinimg.com/originals/70/91/8b/70918bc171c9586466436f399f7542b3.gif",
      profile:
        "https://i.pinimg.com/564x/a9/50/49/a95049064a19b912690f3013012049e1.jpg",
    },
    {
      name: "Jeff Bezoz",
      src: "https://i.pinimg.com/564x/a9/50/49/a95049064a19b912690f3013012049e1.jpg",
      profile:
        "https://i.pinimg.com/564x/a9/50/49/a95049064a19b912690f3013012049e1.jpg",
    },
  ];

  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map((story) => (
        <StoryCard
          key={story.src}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))}
    </div>
  );
};

export default Stories;
