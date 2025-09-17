import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  body: string;
  link?: string;
  linkText?: string;
}

const InfoCard: React.FC<CardProps> = ({ title, body, link, linkText }) => (
  <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
    <h2 className="text-xl font-bold mb-2 capitalize text-[#0f2f54] line-clamp-1">{title}</h2>
    <p className="text-gray-700 mb-4 line-clamp-4 first-letter:uppercase">{body}</p>
    {link && (
      <Link href={link} className="text-[#0f2f54] hover:underline capitalize">
        {linkText || "Read more"}
      </Link>
    )}
  </div>
);

export default InfoCard;
