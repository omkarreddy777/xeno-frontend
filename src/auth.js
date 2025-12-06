export const saveAuth = (token, user, tenant) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("tenant", JSON.stringify(tenant));
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
