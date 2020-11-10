import React from "react";
import ContactForm from "../contact/contact-form";
import Dashboard from "../dashboard/dasboard-container";
import StructureBlock from "../structure-container/structure-container";
import AboutContainer from "../about/about-container";
import AddDayProgress from "../entry-components/entry-add-page";
import SuccessStoryContainer from "../success-stories/success-story-container";
import ReflectCategoryForm from "../structure-completing/reflect-category";

export const pages = [
  {
    name: "dashboard",
    path: "/",
    el: <Dashboard />,
  },
  {
    name: "structure",
    path: "/structure",
    el: <StructureBlock />,
  },
  {
    name: "add entry",
    path: "/add-entry",
    el: <AddDayProgress />,
  },
  {
    name: "about",
    path: "/about",
    el: <AboutContainer />,
  },
  {
    name: "success stories",
    path: "/success-stories",
    el: <SuccessStoryContainer />,
  },
  {
    name: "review category",
    path: "/review-reflect",
    el: <ReflectCategoryForm />,
  },
  {
    name: "contact",
    path: "/contact",
    el: <ContactForm />,
  },
];
