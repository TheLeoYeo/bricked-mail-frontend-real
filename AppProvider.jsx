import React from "react";
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './utils';
import { io } from "socket.io-client";
import { token } from "./secrets";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = React.createContext();

export const useAppContext = () => React.useContext(AppContext);

const sortEmails = (emails) => emails.sort((a, b) => b.importance - a.importance);

const DEFAULT_SETTINGS = {
	categories: ['Work', 'Study', 'Personal', 'Updates', 'Social Media'],
	preferences: '',
}

export const AppProvider = ({ children }) => {
    const [settings, setSettings] = React.useState({})
    const [socket, setSocket] = React.useState(null);
    const [analysis, setAnalysis] = React.useState(null);
    const [lastUpdated, setLastUpdated] = React.useState(null);
    const [emails, setEmails] = React.useState([]);


    React.useEffect(() => {
        // Initialize socket with auth and settings
        const newSocket = io("http://84.46.242.6:8000", {
        auth: {
            token,
            settings,
        },
        });

        setSocket(newSocket);

        newSocket.on('connect', async() => {
            // let preferences = await AsyncStorage.getItem('preferences');
            // let categories = await AsyncStorage.getItem('categories');
            // if (storedPreferences) preferences = JSON.parse(storedPreferences);
            // if (storedCategories) categories = JSON.parse(storedCategories);
            
            context.socket.emit('update-user-categories', preferences);
            context.socket.emit('update-user-preferences', categories);

            newSocket.emit("")
            console.log('Connected to socket server');
            newSocket.emit("fetch-emails");
            await registerForPushNotificationsAsync(socket)
            console.log('Registered for push notifications');

        });

        newSocket.on('brief-summary', ({ id, summary}) => {
            const index = emails.findIndex(email => email.id == id)
            if(index) {
                setEmails(prev => {
                    prev[index].briefSummary = summary;
                    return prev
                })
            }
        })

        newSocket.on('long-summary', ({ id, summary}) => {
            const index = emails.findIndex(email => email.id == id)
            if(index) {
                setEmails(prev => {
                    prev[index].longSummary = summary;
                    return prev
                })
            }
        })

        newSocket.on("emails", (emails) => {
            console.log(emails)
            setEmails(prev => sortEmails([...prev, ...emails]))
        })

        newSocket.on("summary", (data) => {
            console.log(data.text)
            setAnalysis(data.text);
            setLastUpdated(data.lastUpdated)
        })

        newSocket.on("email", (email) => {
            console.log(email)
            setEmails(prev => sortEmails([...prev, email]))
        })

        newSocket.on("user-preferences", (prefrerences) => {
            console.log(prefrerences)
            se
        })

        newSocket.on('disconnect', () => {
            console.log('Disconnected from socket server');
            setSocket(null);
        });

        return () => {
        newSocket.disconnect();
        };
    }, [settings]);

    return (
        <AppContext.Provider value={{ 
            socket,
            settings, setSettings,
            analysis, setAnalysis,
            emails, setEmails,
        }}>
        {children}
        </AppContext.Provider>
    );
};
