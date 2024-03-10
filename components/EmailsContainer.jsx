import React from 'react';
import { View } from 'react-native';
import { EmailCard } from './EmailCard';
import styled from "styled-components/native";

const EmptyText = styled.Text`
    font-size: 17px;
    text-align: center;
    width: 100%;
    font-weight: 800;
    margin-top: 8em;
    color: #A404D7;
    background-color: transparent;
`
export const EmailsContainer = ({ emails }) => {
    console.log(emails)
    return (
        <View>
            {emails.map((email, index) => (
                <EmailCard key={index} email={email} />
            ))}
            {emails.length == 0 && <EmptyText> We're still processing your recent emails ... </EmptyText>}
        </View>
    );
};
