import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const Landing = lazy(() => import('../pages/landing/Landing'));
const Login = lazy(() => import('../pages/login/Login'));
const WelcomeBack = lazy(() => import('../pages/welcome-back/WelcomeBack'));
const Home = lazy(() => import('../pages/home/Home'));
const Chat = lazy(() => import('../pages/chat/Chat'));
const Assets = lazy(() => import('../pages/assets/Assets'));
const Bird = lazy(() => import('../pages/game/Bird'));
const Circle = lazy(() => import('../pages/social/Circle'));
const Contact = lazy(() => import('../pages/social/Contact'));
const Explore = lazy(() => import('../pages/explore/Explore'));
const Forest = lazy(() => import('../pages/game/Forest'));
const GameLayout = lazy(() => import('../pages/game/GameLayout'));
const SocialLayout = lazy(() => import('../pages/social/SocialLayout'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-[320px] h-[600px] bg-gradient-to-r from-[#f06daf] to-[#2da1ff] text-xl text-white">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome-back" element={<WelcomeBack />} />
        <Route path="/home" element={<Home />}>
          <Route path="" element={<Navigate to="chat" replace />} />
          <Route path="chat" element={<Chat />} />
          <Route path="explore" element={<Explore />} />
          <Route path="assets" element={<Assets />} />
          <Route path="game" element={<GameLayout />}>
            <Route path="" element={<Navigate to="bird" replace />} />
            <Route path="bird" element={<Bird />} />
            <Route path="forest" element={<Forest />} />
          </Route>
          <Route path="social" element={<SocialLayout />}>
            <Route path="" element={<Navigate to="contact" replace />} />
            <Route path="contact" element={<Contact />} />
            <Route path="circle" element={<Circle />} />
          </Route>
          <Route path="*" element={<Navigate to="chat" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
