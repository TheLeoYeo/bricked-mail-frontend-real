import React, { useState, useRef} from "react";
import styled from "styled-components/native";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { EmailButton } from "./EmailButton";
import { IMPORTANCE_MAPPINGS } from "../utils"
import { useAppContext } from "../AppProvider.jsx";

const AVATAR_COLOURS = ["#ab5252", "#5a68a1", "#d8db6b", "#47295e"]

const Container = styled.View`
	width: 100%;
	height: fit-content;
	display: flex;
	border-top-color: #630bd62b;
	border-top-width: 4px;

	overflow-y: clip;
	position: relative;
	font-size: 14px;
    ${props => props.expanded && `background-color: black; `}
	padding-bottom: 1px;
    z-index: 2;
`


const EmailMeta = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: visible;
`

// needs span behaviour
const BriefSummary = styled.Text`
    padding: 0px;
    max-width: 100%;
    overflow: clip;
    color: #d1d0d0;
    white-space: nowrap; /* Prevent text from wrapping to the next line */
  	overflow: hidden; /* Hide overflow */
  	font-weight: 300;
    font-size: 16px;
`

// needs span behaviour
const Subject = styled.Text`
    font-weight: 800;
    font-size: 16px;
    padding: 0px;
    overflow: hidden; /* Hide overflow */
	color: white;
`

// needs span behaviour
const DateContainer = styled.Text`
    font-size: 14px;
    font-weight: 600;    
    padding-top: 0.5em;
    padding-bottom: 0.25em;
	color: white;
`

// needs span behaviour
const CategoryLabel = styled.Text`
    font-weight: 600;
    padding: 0.4em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    color: #b64df8e8;
    z-index: 10;
    opacity: 1;
    font-size: 14px;
    margin-right: 0.5em;
    border-radius: 3px;
    text-align: center;
    border-radius: 20px;
	flex: 1;
`

const ImportanceLabel = styled(CategoryLabel)`
    color: white;
	padding: 0.3rem 0.6rem;
    background-color: #101010d4;
    ${props => props.importance >= 0 && `
    background-color: rgba(173, 216, 230, ${props.importance / 5});`}
    
    ${props => props.importance >= 4 && `
    background-color: #e19200;
    `}

	${props => props.importance >= 7 && `
	background-color: #d70505;`};
`

const DeadlineLabel = styled(CategoryLabel)`
    color: white;
	padding: 0.3rem 0.6rem;
    background-color: #101010d4;
    font-weight: 800;
    ${props => props.importance >= 0 && `
    color: rgba(173, 216, 230, ${props.importance / 5});`}
    
    ${props => props.importance >= 4 && `
    color: #e19200;
    `}

	${props => props.importance >= 7 && `
	color: #d70505;`};
`

const Internal = styled.View`
    padding: 0.9em 1em;
    display: flex;
	flex-direction:row;
    align-items: center;
    height: 100%;
	background: #0b0a11;
`

const Avatar = styled.View`
    width: 3rem;
    height: 3rem;
    color: white;
    border-radius: 999px;
    margin-right: 1rem;
`

const AvatarText = styled.Text`
    font-size: 36px;
    font-weight: bold;
    color: white;
    position: relative;
    height: 100%;
    text-align: center;
    top: -0.7rem;
    width: 100%;
`


// touching some grass
const StyledAnimatedView = styled(Animated.View)`
  align-items: center;
  justify-content: center;
`;


const LongSummary = styled.Text`
    color: #f3f3f3; 
    font-size: 14px;
    font-weight: 200;
    padding-bottom: 1em;
    padding-top: 1em;
    padding-inline: 1rem;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 1);
    width: 300px;
    margin-bottom: 0.5em;
`;


const  Metadata = styled.Text`
    width: 100%;
    font-weight: 200;
    font-size: 16px;
    color: #b64df8e8;
`
const InlineFlex = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.8rem;
`

const EmailChips = styled.Text`
    padding-top: 0.5em;
`

const ShowLongSummary = styled(Icon)`
    color: white;
    font-size: 24px;
    ${props => !props.expanded && `transform: rotate(180deg)`}
`

const MetadataContainer = styled.View`
    padding-bottom: 0.5em;
`

function truncateText(text, length){
    if(text === undefined){
        return ""
    }
	needsTruncating = text.length > length - 3
	return text.substring(0, Math.max(0, Math.min(text.length, length - 3))) + (needsTruncating ? "..." : "")
}

function randomColor(){
    return AVATAR_COLOURS[Math.floor(Math.random() * AVATAR_COLOURS.length)]
}

export const EmailCard = ({ email }) => {
    const context = useAppContext();
    const animation = useRef(new Animated.Value(1)).current;
    const [expanded, setExpanded] = React.useState(false);

    const fetchBriefSummary = () => context.emit('fetch-brief-summary', email.id);
    const fetchLongSummary = () => context.emit('fetch-long-summary', email.id);

    // Function to trigger the animation
    const animatePress = () => {
        Animated.sequence([
        Animated.timing(animation, {
            toValue: 0.95, // Scale down to 80%
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(animation, {
            toValue: 1, // Scale back to 100%
            duration: 100,
            useNativeDriver: true,
        }),
        ]).start();
        setExpanded(prev => (!prev))
    };
	return (
        <TouchableOpacity onPressIn={animatePress}>
            <StyledAnimatedView style={{ transform: [{ scale: animation}]}}>
                <Container expanded={expanded}>
                    <Internal>
                        <Avatar><AvatarText>{email.from ? email.from[0] : "?"}</AvatarText></Avatar>
                        <EmailMeta style = {{gap: '0.4em'}}>
                            <Subject>{truncateText(email.subject, 40)}</Subject>
                            <DateContainer>{email.from || ""}  {email.date || ""}</DateContainer>
                            <InlineFlex style = {{gap: '1rem'}}>
                                {email.briefSummary 
                                ? <BriefSummary>{truncateText(email.briefSummary, 30)}</BriefSummary>
                                : <EmailButton title="Gen. Brief Summary" onClick={fetchBriefSummary}/>}
                                {email.longSummary 
                                ? <></>
                                :  <EmailButton title="Gen. Long summary" onClick={fetchLongSummary}/>}
                                <ShowLongSummary expanded = {expanded} name = "arrow-drop-down-circle" />
                            </InlineFlex>
                            {expanded && 
                                <MetadataContainer>
                                    { email.longSummary && <LongSummary> {email.longSummary} </LongSummary> }
                                    { email.attachments?.length > 0 &&
                                        <Metadata>
                                            Attached: {email.attachments.map(a => `${a.filename}[${a.size}b]`).join(', ')}
                                        </Metadata>
                                    }
                                    { email.cc && <Metadata> CC: {email.cc} </Metadata> }
                                </MetadataContainer>
                            }
                            <EmailChips>
                                { email.importance && <ImportanceLabel importance={email.importance}>{IMPORTANCE_MAPPINGS[email.importance-1]}</ImportanceLabel> }
                                { email.deadline && <DeadlineLabel importance={email.importance}> {email.deadline} </DeadlineLabel>}
                                { email.category && <CategoryLabel>{email.category}</CategoryLabel> }
                            </EmailChips>
                        </EmailMeta>
                    </Internal>
                </Container>
            </StyledAnimatedView>
        </TouchableOpacity>
	)
}