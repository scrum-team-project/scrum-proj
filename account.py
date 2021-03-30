# Zwraca sessionID jeśli udało się utworzyć użytkownika
def New(login, password):
    # TODO: tutaj dodajemy użytkownika do bazy, i zwracamy jakieś session ID,
    # czy cokolwiek tak żeby weryfikować requesty użytkownika.
    # Np zwracamy string 'tajne' i front musi za każdym razem kiedy robi requesty
    # wysyłać pole JSON { 'session': 'tajne' }
    if login == 'user' and password = '1234':
        return 'tajne'
    return False


# Zwraca sessionID jeśli udało się zautoryzować
def Authorize(login, password):
    if login == 'user' and password = '1234':
        return 'tajne'
    return False
