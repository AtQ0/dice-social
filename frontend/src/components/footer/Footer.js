'use client';
import PropTesting from "../propTesting/PropTesting";
import { useContext } from "react";
import { MyContext } from "@/app/context/MyContextProvider";

export default function Footer() {
    const username = "Jerry";
    const { someValue, setSomeValue } = useContext(MyContext);

    return (
        <footer className="footer">
            <style jsx>{`
        .footer {
          background-color: #333;
          color: white;
          padding: 10px;
          text-align: center;
          font-size: 14px;
        }
      `}</style>
            <div>
                <PropTesting someProp={username} setSomeValue={setSomeValue} />
                {someValue}
            </div>
        </footer>
    );
}
