import React from 'react';

/* 探索页面-Twitter KOL精选帖子和结论*/
const TwitterKOLs: React.FC = () => {
  const KOLPosts = [
    {
      name: 'Alex🐳',
      handle: 'alexgiantwhale',
      message: "Which market maker does Neiro's trading strategy resemble? If it does, it's about to start.",
      imgSrc: 'https://pbs.twimg.com/profile_images/1839520918185652224/s6U0Nxhv_bigger.jpg',
    },
    {
      name: 'Sam🦈',
      handle: 'samtheshark',
      message: 'The crypto market is showing signs of a bullish trend. Time to dive in!',
      imgSrc: 'https://i.pinimg.com/75x75_RS/b1/04/15/b10415d97794677b0b5375d3b6ae09de.jpg',
    },
    {
      name: 'Lily🐬',
      handle: 'lilydolphin',
      message: 'Diversification is key in crypto investments. Don’t put all your eggs in one basket.',
      imgSrc: 'https://i.pinimg.com/75x75_RS/a9/0b/d6/a90bd67bdf00a9c57af613503a374ffa.jpg',
    },
    {
      name: 'Tom🐢',
      handle: 'tomtheturtle',
      message: 'Slow and steady wins the race. Patience is crucial in the volatile crypto world.',
      imgSrc: 'https://i.pinimg.com/736x/bf/43/b1/bf43b1d711aaf7d04e6fe2ba16705634.jpg',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#f06daf] to-[#f6a6c1] bg-clip-text text-transparent">
        Opinions from KOLs
      </h3>
      <div className="space-y-3">
        {KOLPosts.map((post, index) => (
          <div
            key={index}
            className="p-3 rounded-lg border border-gray-100 hover:border-[#f06daf] 
                     transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <img className="rounded-full w-12 h-12 border-2 border-[#f06daf] p-0.5" alt={post.name} src={post.imgSrc} />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{post.name}</span>
                <a href={`/${post.handle}`} className="text-sm text-gray-500 hover:text-[#f06daf]">
                  @{post.handle}
                </a>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed pl-15">{post.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwitterKOLs;
