export const ConstVariables = {
  emailPattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/,
  requestTypes: ['Payment Issue', 'Website Issue', 'Security Issue', 'Other'],
  ticketFilters: ['All' ,'Assigned', 'Closed', 'Solved', 'Not Assigned', 'Not Closed', 'Not Solved'],
  numberFilters: ['From low to high', 'From high to low'],
  ticketFilterOptions: ['All', 'Yes', 'No']
}
