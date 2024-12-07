import React from 'react';

const CirclePost: React.FC<{ name: string; handle: string; message: string; imgSrc: string }> = ({ name, handle, message, imgSrc }) => {
  return (
    <div className="border shadow p-4 mb-4">
      {' '}
      {/* 增加padding和margin-bottom */}
      <div className="flex items-center mb-2">
        {' '}
        {/* 增加margin-bottom */}
        <img className="rounded-full w-10 h-10 mr-2" alt="" src={imgSrc}></img>
        <span>
          {name}
          <a href={`/${handle}`} aria-hidden="true" role="link">
            @{handle}
          </a>
        </span>
      </div>
      <div className="text-gray">{message}</div>
      <div className="border-t border-gray-300 my-4"></div>
    </div>
  );
};

const Circle: React.FC = () => {
  const posts = [
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
    <div>
      {posts.map((post, index) => (
        <CirclePost key={index} {...post} />
      ))}
    </div>
  );
};

export default Circle;
