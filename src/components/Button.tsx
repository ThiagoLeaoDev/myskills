import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps{//TouchableOpacityProps retorna todas as propriedades | extends me permite trazer as propriedades criadas por mim
  title: string;
} 

export function Button({ title, ...rest } : ButtonProps){ //"...rest" traz todas as propriedades do button, nao so a onPress
  return(
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#a370f7',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  },
})