import React from 'react'
import { EmailsContainer } from '../components/EmailsContainer';
import { EmailSummary } from '../components/EmailSummary';
import styled from "styled-components/native"
import { useAppContext } from '../AppProvider';

const summaryData = {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    lastUpdated: "43 minutes",
    numberUrgent: 4,
    numberImportant: 12,
}

const emails = [
    {
        id: "1",
        subject: "Test Email 1",
        from: "sender@example.com",
        to: "receiver@example.com",
        date: "2024-03-10",
        snippet: "This is a test email 1",
        categories: "Work",
        attachments: [{ filename: "attachment1.pdf", size: 1024 }],
        cc: "cc@example.com",
        brief_summary: "Brief summary of test email 1",
        long_summary: "Nostrud dolore occaecat id reprehenderit consequat deserunt anim dolore. Cillum elit voluptate ipsum voluptate qui dolor do mollit veniam fugiat id. Quis est occaecat aliqua nulla proident irure nostrud sit nostrud. Aute aliqua culpa amet incididunt adipisicing non do. Irure pariatur esse eiusmod et in sit laboris Lorem. Deserunt quis anim incididunt ut enim velit culpa tempor nisi Lorem commodo et cillum. Ipsum irure reprehenderit minim sint do.",
        importance: 1,
        category: "Urgent",
        deadline: "2024-03-15"
    },
    {
        id: "2",
        subject: "Test Email 2",
        from: "sender2@example.com",
        to: "receiver2@example.com",
        date: "2024-03-11",
        snippet: "This is a test email 2",
        categories: "Personal",
        attachments: [],
        cc: "cc2@example.com",
        brief_summary: "Brief summary of test email 2",
        long_summary: "Ullamco laboris qui velit deserunt irure magna deserunt veniam. Fugiat Lorem id labore duis. Voluptate velit adipisicing laboris sunt ea cillum nulla excepteur incididunt commodo.",
        importance: 2,
        category: "Normal",
        deadline: "2024-03-20"
    },
    {
        id: "3",
        subject: "Sint nisi nisi enim officia tempor laborum occaecat labore nisi.",
        from: "sender3@example.com",
        to: "receiver3@example.com",
        date: "2024-03-12",
        snippet: "This is a test email 3 without subject",
        categories: "Updates",
        attachments: [{ filename: "update.pdf", size: 2048 }],
        cc: "cc3@example.com",
        brief_summary: "Brief summary of test email 3",
        long_summary: "Aute elit ut aliquip sint. Consequat amet esse mollit ullamco velit non enim. Sint aute consectetur id labore quis cupidatat ut fugiat magna. Elit elit aliqua mollit adipisicing adipisicing cillum ex est esse aliquip irure nisi tempor ea. Nulla magna Lorem incididunt aliquip nulla culpa. Sit irure magna cillum minim esse non elit do ipsum aliqua pariatur. Dolore duis officia ullamco minim.",
        importance: 3,
        category: "Low",
        deadline: "2024-03-25"
    },
    {
        id: "4",
        subject: "Test Email 4",
        from: "zeddgrayhem@gmail.com",
        to: "receiver4@example.com",
        date: "2024-03-25",
        snippet: "This is a test email 4 with missing from and date",
        categories: "News",
        attachments: [{ filename: "news.pdf", size: 4096 }],
        cc: "cc4@example.com",
        brief_summary: "Brief summary of test email 4",
        long_summary: "Reprehenderit anim sunt excepteur laborum proident sit nulla velit ea. Ullamco irure Lorem nulla commodo sint ipsum. Ea ad et occaecat consequat voluptate aliquip ex adipisicing. Qui veniam nulla laboris incididunt magna.",
        importance: 4,
        category: "Information",
        deadline: "2024-03-30"
    },
    {
        id: "5",
        subject: "Test Email 5",
        from: "zeddgrayhem@gmail.com",
        to: "receiver4@example.com",
        date: "2024-03-25",
        snippet: "This is a test email 5 with missing from and date",
        categories: "News",
        attachments: [{ filename: "news.pdf", size: 4096 }],
        cc: "cc4@example.com",
        importance: 10,
        category: "Information",
        deadline: "2024-03-30"
    }
];

const ScrollingContainer = styled.View`
    overflow-y: scroll;
    overflow-x: clip;
    height: 100%;
    background: #000;
`

export const EmailsScreen = () => {
    const context = useAppContext();

    return (
        <ScrollingContainer>
            <EmailSummary/>
            <EmailsContainer emails={context.emails}></EmailsContainer>
        </ScrollingContainer>
    )
}

