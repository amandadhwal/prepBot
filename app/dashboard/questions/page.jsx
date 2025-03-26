"use client";
import Image from "next/image";
import React, { useState } from "react";

function CoursesPage() {
  const [courses] = useState([
    { 
      id: 1, 
      name: "React for Beginners (GeeksforGeeks)", 
      price: "$49", 
      description: "Learn React from scratch with hands-on projects.", 
      image: "/images/react-course.jpg", // ✅ Fix: Use string instead of JSX
      link: "https://www.geeksforgeeks.org/courses/react-js-beginner-to-advance" 
    },
    { 
      id: 2, 
      name: "Advanced Next.js (Udemy)", 
      price: "$79", 
      description: "Deep dive into server-side rendering, API routes, and more.", 
      image: "/images/nextjs.jpg", 
      link: "https://www.udemy.com/courses/search/?src=ukw&q=nextjs" 
    },
    { 
      id: 3, 
      name: "Full-Stack Development (Coursera)", 
      price: "$99", 
      description: "Master front-end and back-end development with modern tools.", 
      image: "/images/full_stack.jpeg", 
      link: "https://www.coursera.org/learn/fullstack-web-development" 
    },
    { 
      id: 4, 
      name: "JavaScript Mastery (Udemy)", 
      price: "$59", 
      description: "Strengthen your JavaScript skills with real-world exercises.", 
      image: "/images/javascript-course.png", 
      link: "https://www.udemy.com/courses/search/?src=ukw&q=javascript" 
    },
    { 
      id: 5, 
      name: "Data Structures & Algorithms (GeeksforGeeks)", 
      price: "$89", 
      description: "Ace coding interviews with DSA concepts and problems.", 
      image: "/images/dsa-course.png", 
      link: "https://www.geeksforgeeks.org/courses/dsa-self-paced" 
    },
    { 
      id: 6, 
      name: "Python for Data Science (Coursera)", 
      price: "$69", 
      description: "Learn Python and its applications in data analysis and machine learning.", 
      image: "/images/python-course.webp", 
      link: "https://www.coursera.org/search?query=python" 
    },
    { 
      id: 7, 
      name: "Machine Learning Basics (Udemy)", 
      price: "$109", 
      description: "Get started with machine learning concepts and algorithms.", 
      image: "/images/ml-course.jpeg", 
      link: "https://www.udemy.com/course/machine-learning-basics" 
    }
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="p-6 bg-gray-100 rounded-lg shadow-md">
            {/* Course Image */}
            <div className="relative w-full h-40 mb-4">
              <Image 
                src={course.image} 
                alt={course.name} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-md"
              />
            </div>

            <h2 className="text-lg font-semibold">{course.name}</h2>
            <p className="text-gray-700">{course.description}</p>
            <p className="text-blue-600 font-bold mt-2">{course.price}</p>

            {/* Purchase Button */}
            <a 
              href={course.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Purchase
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
