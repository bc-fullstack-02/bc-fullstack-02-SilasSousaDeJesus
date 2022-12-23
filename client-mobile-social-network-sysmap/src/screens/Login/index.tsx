import React from 'react';
import { View, Image } from 'react-native';
import {Heading} from '../../components/Heading';

import logo from '../../../assets/images/logo.png';

import {styles} from './styles';

export default function Login(){
    return(
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMethod='scale'/>
            <Heading title="Sysmap Parrot" subtitle='Faça o login e comece a usar' />
        </View>
    );
}