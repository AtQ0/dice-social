"use client";
import styles from "./page.module.css";
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Formik, Form, Field } from 'formik';

export default function Game() {
    const params = useParams();
    const { username } = params;
    const [lastDiceRollPlayer, setLastDiceRollPlayer] = useState("");
    const [lastDiceResult, setLastDiceResult] = useState("");
    const [diceRolls, setDiceRolls] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]); // State to store user stats
    const socket = useRef();
    const hasPostedUser = useRef(false); // Ref to track if the user has been posted

    useEffect(() => {
        // Connect to the WebSocket server on port 3000
        socket.current = io('http://localhost:3000');

        socket.current.on('connect', () => {
            console.log(`Connected to WebSocket server with id ${socket.current.id}`);
        });

        socket.current.on('disconnect', () => {
            console.log(`Disconnected from WebSocket server with id ${socket.current.id}`);
        });

        // Listen for new chat messages from server and update interface for all clients
        socket.current.on('newChatMessage', (msg) => {
            console.log('New message received:', msg); // Log received message
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Listen for user stats update event
        socket.current.on('userStatsUpdate', (data) => {
            // Update user stats
            setUsers(data);
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);


    useEffect(() => {
        // Only post the user once
        if (!hasPostedUser.current) {
            hasPostedUser.current = true;

            // Create object to be sent
            let newObject = {
                "dicePlayerName": username, // Correct field name
            };

            // Convert the object to a JSON string
            let inputForBody = JSON.stringify(newObject);

            // Add new user to DB by using POST
            fetch('https://www.atkobabic.com/api/dice/diceplayers/', {
                body: inputForBody,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            })
                .then(response => response.json())
                .then(result => {
                    // Handle response if needed
                    // Notify the server about the new user login
                    socket.current.emit('userLogin', username);
                })
                .catch(error => {
                    console.error('Error posting new user:', error);
                });
        }
    }, [username]); // username as a dependency to ensure it only runs when username changes


    /*======================*/
    /*==== DICE ROLLS ======*/
    /*======================*/

    function handleDiceBtn() {

        // Generate a random dice throw
        const diceThrow = Math.floor(Math.random() * 6) + 1;

        // Save dice throw result
        setLastDiceRollPlayer(username);
        setLastDiceResult(diceThrow);

        // Post dice roll to DB (not implemented)
        // Update user stats after rolling dice
        fetchDiceRollStats();
    }


    // Function to fetch latest dice roll stats from DB
    function fetchDiceRollStats() {
        fetch('https://www.atkobabic.com/api/dice/dicerolls/')
            .then(response => response.json())
            .then(data => {
                setDiceRolls(data);
            })
            .catch(error => {
                console.error('Error fetching user stats:', error);
            });
    }


    return (
        <main className={styles.main}>
            <h2 className={styles.greeting}>Welcome {username}!</h2>
            <div className={styles['game-container']}>
                <div className={styles['user-stats-container']}>
                    <h4>User stats</h4>
                    <div className={styles['user-stats-wrapper']}>
                        <ul>
                            {users.map(user =>
                                <li key={user.id}>{user.dicePlayerName} logged in.</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className={styles['dice-game-container']}>
                    <h4>Game</h4>
                    <div className={styles['dice-game-wrapper']}>
                        <div className={styles['dice-game']}>
                            {lastDiceResult ? <h2>{lastDiceResult}</h2> : <h1>#</h1>}
                        </div>
                        <button className={styles['roll-dice-btn']} onClick={handleDiceBtn}>Roll dice</button>
                    </div>
                </div>
                <div className={styles['chat-container']}>
                    <h4>Chat</h4>
                    <div className={styles['chat-wrapper']}>
                        <ul>
                            {messages.map((msg, index) => (
                                <li key={index}><strong>{msg.username}:</strong> {msg.message}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles['chat-input-wrapper']}>
                        <Formik
                            initialValues={{ chatInput: '' }}
                            onSubmit={(values, { resetForm }) => {
                                if (values.chatInput) {
                                    const messagePayload = {
                                        username: username,
                                        message: values.chatInput
                                    };
                                    socket.current.emit('chatMessage', messagePayload);
                                    resetForm();
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className={styles['chat-form']} id="chat-form">
                                    <Field
                                        type="text"
                                        id="chat-input"
                                        name="chatInput"
                                        className={styles['chat-input']}
                                        placeholder="Type your message here..."
                                    />
                                    <button type="submit" disabled={isSubmitting}>
                                        Send
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

        </main>
    );
}
