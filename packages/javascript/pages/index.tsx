/**
 * 首页
 */
import Link from 'next/link';
import HomeNav from 'components/home/header';

const HomePage = () => {
  return (
    <HomeNav>
      <Link href="/">
        <a>首页</a>
      </Link>
      <Link href="/blogs">
        <a>博客</a>
      </Link>
      <Link href="/about">
        <a>关于我</a>
      </Link>
      <Link href="/404">
        <a>404</a>
      </Link>
    </HomeNav>
  );
};

export default HomePage;
