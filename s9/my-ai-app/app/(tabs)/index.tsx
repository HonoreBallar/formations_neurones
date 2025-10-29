import { generateAPIUrl } from '@/utils';
import { fetch as expoFetch } from 'expo/fetch';
import { useState } from 'react';
import { View, TextInput, ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await expoFetch(generateAPIUrl('/api/chat'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const assistantMessage = await response.json();
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <Text>{error}</Text>;

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View
        style={{
          height: '95%',
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 8,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {messages.map(m => (
            <View key={m.id} style={{ marginVertical: 8 }}>
              <View>
                <Text style={{ fontWeight: '700' }}>{m.role}</Text>
                <Text>{m.content}</Text>
              </View>
            </View>
          ))}
          {isLoading && (
            <View style={{ marginVertical: 8 }}>
              <Text style={{ fontStyle: 'italic' }}>Thinking...</Text>
            </View>
          )}
        </ScrollView>

        <View style={{ marginTop: 8, flexDirection: 'row' }}>
          <TextInput
            style={{
              backgroundColor: 'white',
              padding: 8,
              flex: 1,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 4,
            }}
            placeholder="Say something..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            autoFocus={true}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              marginLeft: 8,
              backgroundColor: isLoading || !input.trim() ? '#ccc' : '#007AFF',
              padding: 8,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>
              {isLoading ? 'Sending...' : 'Send'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}