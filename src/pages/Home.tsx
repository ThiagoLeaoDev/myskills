import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  StatusBar
} from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData { //tipo de dado
  id: string;
  name: string; 
  //"?" Torna o atributo opcional
}

export function Home(){
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setgreeting] = useState('');

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }

    setMySkills(oldState => [...oldState, data]) // (...) Spread operator => despeja o conteudo do vetor em um novo vetor
  }

  function handleRemoveNewSkill(id: string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    
    if(currentHour < 12){
      setgreeting('Good morning');
    }
    else if(currentHour >= 12 && currentHour < 18){
      setgreeting('Good afternoon');
    }
    else{
      setgreeting('Good night');
    }
  }, []) 

  return(
    <View style={styles.container}>
      
      <Text style={styles.title}>Welcome, Thiago</Text>

      <Text style={styles.greeting}>
        {greeting}
      </Text>


      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button
        title="Add"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList //lazy load
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
          skill={item.name}
          onPress={() => handleRemoveNewSkill(item.id)}
          />
        )}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#ffffff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10, //platform verifica o Sistema operacional do dispositivo
    marginTop: 30,
    borderRadius: 7
  },
  greeting: {
    color: '#FFF',
    opacity: 0.5
  }
})