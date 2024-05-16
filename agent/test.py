from transformers import BertTokenizer

# Initialize the tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Example sentence
sentence = "Hello, how are you doing today?"

# Encode the sentence
encoded_input = tokenizer.encode(sentence, add_special_tokens=True)

# Decode the encoded sentence
decoded_output = tokenizer.decode(encoded_input)

print("Encoded:", encoded_input)
print("Decoded:", decoded_output)
