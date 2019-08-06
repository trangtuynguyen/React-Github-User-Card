import React from "react";
import { Card, Icon, Image } from 'semantic-ui-react'

export default function UserCard({username, repo, img}){
    return(
        <Card>
            <Image src={img} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>
                <span className='date'>Number of Repositories: {repo}</span>
            </Card.Meta>
            <Card.Description>
                User Infos will go here.
            </Card.Description>
            </Card.Content>
        </Card>
        
    )
}