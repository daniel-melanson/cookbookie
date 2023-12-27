import React from "react";
import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";

function HeaderItem(props: { children: React.ReactNode }) {
  return (
    <li className="mb-2">
      <h2 className="text-3xl font-light">{props.children}</h2>{" "}
    </li>
  );
}

function Item(props: { children: React.ReactNode }) {
  return <li className="my-1 flex items-center text-sm">{props.children}</li>;
}

export default function Footer() {
  return (
    <footer className="items-top mt-9 flex justify-center space-x-40 bg-neutral-800 py-10 text-white">
      <ul>
        <HeaderItem>About</HeaderItem>
        <Item>
          <Link href="/privacy-and-terms">Privacy and Terms</Link>
        </Item>
        <Item>Copyright © 2023</Item>
      </ul>
      <ul>
        <HeaderItem>Sitemap</HeaderItem>
        <Item>
          <Link href="/">Home</Link>
        </Item>
        <Item>
          <Link href="/recipes">Recipes</Link>
        </Item>
        <Item>
          <Link href="/ingredients">Ingredients</Link>
        </Item>
      </ul>
      <ul>
        <HeaderItem>Social</HeaderItem>
        <Item>
          <Link href="https://github.com/daniel-melanson/cookbookie">
            <RiGithubFill className="inline" /> Cookbookie
          </Link>
        </Item>
        <Item>
          <Link href="https://github.com/ryecai">
            <RiGithubFill className="inline" /> Ryan Cai
          </Link>
        </Item>
        <Item>
          <Link href="https://github.com/daniel-melanson">
            <RiGithubFill className="inline" /> Daniel Melanson
          </Link>
        </Item>
      </ul>
    </footer>
  );
}
