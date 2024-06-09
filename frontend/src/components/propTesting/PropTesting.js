'use client';
import styles from "./PropTesting.module.css";

export default function PropTesting({ someProp, setSomeValue }) {

    const handleClick = () => {
        setSomeValue("?");
    };

    return (
        <div>
            {someProp && <p>The prop value is: {someProp}</p>}
            <button onClick={handleClick}>Change Value</button>
        </div>
    );
}
