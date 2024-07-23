import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Container } from "../index";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = Navigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus,
    },
  ];
  return (
    <header>
      <Container>
        <nav>
          <div>Logo</div>
          <ul>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
