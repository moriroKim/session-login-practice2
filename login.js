const form = document.querySelector('form');
const idInput = document.querySelector('#user_id');
const pwInput = document.querySelector('#user_pw');
const loginBtn = document.querySelector('#login_button');
const logoutBtn = document.querySelector('#logout_button');
const main = document.querySelector('main');
const userName = document.querySelector('#user_name');
const userInfo = document.querySelector('#user_info');
const BASE_URL = 'http://localhost:3000';

axios.defaults.withCredentials = true;

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

const login = () => {
  const userId = idInput.value;
  const userPw = pwInput.value;
  return axios.post(BASE_URL, {
    userId,
    userPw,
  });
};

const logout = () => {
  return axios.delete(BASE_URL);
};

const getUserInfo = () => {
  return axios.get(BASE_URL);
};

const renderUserInfo = ({ user_info, user_name }) => {
  main.style.display = 'flex';
  form.style.display = 'none';
  userName.textContent = user_name;
  userInfo.textContent = user_info;
};

const renderLoginForm = () => {
  main.style.display = 'none';
  form.style.display = 'flex';
  userName.textContent = '';
  userInfo.textContent = '';
  idInput.value = '';
  pwInput.value = '';
};

loginBtn.onclick = async () => {
  const res = await login();
  const data = await getUserInfo();
  console.log(data);
  renderUserInfo(data.data);
};

logoutBtn.onclick = async () => {
  const res = await logout();
  console.log(res);
  renderLoginForm();
};
