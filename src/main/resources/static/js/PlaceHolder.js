(() => {
    const USERS_KEY = 'tacobaguet_users_v1';
    const CURRENT_KEY = 'tacobaguet_current_user_v1';
  
    let users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
    // Admin account
    if (!users.some(u => u.email === "tacobaguet@gmail.com")) {
      users.push({
        id: crypto.randomUUID(),
        email: "tacobaguet@gmail.com",
        username: "tacobaguet",
        password: "admin:123",
        verified: true,
        preferences: {darkMode:false,gamesToggle:true,toolsToggle:true,videosToggle:true}
      });
    }
  
    // Developer account (auto-login)
    let devUser = users.find(u => u.email === "dev1@gmail.com");
    if (!devUser) {
      devUser = {
        id: crypto.randomUUID(),
        email: "dev1@gmail.com",
        username: "Dev1",
        password: "Dev1Pass!",
        verified: true,
        preferences: {darkMode:false,gamesToggle:true,toolsToggle:true,videosToggle:true}
      };
      users.push(devUser);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
    // Auto-login developer
    sessionStorage.setItem(CURRENT_KEY, devUser.id);
  
    // -------- Helper Functions --------
    function loadUsers(){try{return JSON.parse(localStorage.getItem(USERS_KEY)||'[]');}catch{return []}}
    function saveUsers(users){localStorage.setItem(USERS_KEY,JSON.stringify(users))}
    function getCurrentUserId(){return sessionStorage.getItem(CURRENT_KEY)||localStorage.getItem(CURRENT_KEY);}
    function setCurrentUserId(userId,remember){if(remember) localStorage.setItem(CURRENT_KEY,userId);else sessionStorage.setItem(CURRENT_KEY,userId);}
    function clearCurrentUser(){sessionStorage.removeItem(CURRENT_KEY);localStorage.removeItem(CURRENT_KEY);}
    function getUserById(id){return loadUsers().find(u=>u.id===id);}
    function maskEmail(email){return email.includes('@gmail.com')?email.slice(0,3)+'*****@gmail.com':email;}
    function isAdmin(user){return user.email.toLowerCase()==="tacobaguet@gmail.com";}
  
    // -------- Header Menu --------
    function initHeaderGreeting(){
      const el = document.getElementById('userMenu');
      if(!el) return;
      const id = getCurrentUserId();
      if(!id){el.innerHTML=`<a class="btn" href="logon/register.html">Register / Login</a>`;return;}
      const user = getUserById(id);
      if(!user){clearCurrentUser();el.innerHTML=`<a class="btn" href="logon/register.html">Register / Login</a>`;return;}
      el.innerHTML = `<div class="user-menu">
        <span>👤 ${user.username}</span>
        <div class="dropdown">
          <p><strong>Email:</strong> ${maskEmail(user.email)}</p>
          <p><strong>Password:</strong> *******</p>
          <a href="logon/account.html">Account Management</a>
          ${isAdmin(user)?'<a href="logon/admin.html">Admin Panel</a>':''}
          <a href="#" id="logoutBtn">Log out</a>
        </div></div>`;
      document.getElementById('logoutBtn')?.addEventListener('click', e=>{e.preventDefault();clearCurrentUser();location.reload();});
    }
  
    document.addEventListener('DOMContentLoaded', initHeaderGreeting);
  
    // -------- Registration --------
    async function registerUser(email, username, password){
      let users = loadUsers();
      if(users.some(u=>u.email===email)) return {success:false,message:"Email already registered"};
      if(users.some(u=>u.username===username)) return {success:false,message:"Username already taken"};
      const newUser = {id:crypto.randomUUID(),email,username,password,verified:false,preferences:{darkMode:false,gamesToggle:true,toolsToggle:true,videosToggle:true}};
      users.push(newUser);
      saveUsers(users);
      return {success:true,message:"Account created. Verification email sent."};
    }
  
    // -------- Login --------
    async function loginUser(email,password,remember){
      const users = loadUsers();
      const user = users.find(u=>u.email===email);
      if(!user) return {success:false,message:"Unrecognized email"};
      if(user.password!==password) return {success:false,message:"Incorrect password"};
      if(!user.verified) return {success:false,message:"Email not verified"};
      setCurrentUserId(user.id,remember);
      return {success:true,message:"Logged in successfully"};
    }
  
    // -------- Account Helpers --------
    function saveUser(user){let users=loadUsers();const i=users.findIndex(u=>u.id===user.id);if(i>=0){users[i]=user;saveUsers(users);}}
    function getCurrentUser(){const id=getCurrentUserId();if(!id) return null;return getUserById(id);}
    function logoutUser(){clearCurrentUser();}
  
    // -------- Apply Preferences --------
    function applyPreferences(prefs,force=false){
      if(!prefs) return;
      // Background & text contrast
      document.body.style.backgroundColor = prefs.darkMode ? "#f5f5f5" : "#111";
      document.body.style.color = prefs.darkMode ? "#111" : "#f5f5f5";
  
      // Cards & buttons
      document.querySelectorAll(".card").forEach(c=>{
        c.style.backgroundColor = prefs.darkMode ? "#222" : "#fff";
        c.style.color = prefs.darkMode ? "#f5f5f5" : "#111";
      });
      document.querySelectorAll("button").forEach(b=>{
        b.style.backgroundColor = prefs.darkMode ? "#ff6600" : "#ff6600";
        b.style.color = prefs.darkMode ? "#fff" : "#fff";
      });
  
      // Tabs visibility (main page)
      ["gamesTab","toolsTab","videosTab"].forEach(tabId=>{
        const el = document.getElementById(tabId);
        if(el) el.style.display = prefs[tabId+"Toggle"]===false?"none":"block";
      });
    }
  
    // -------- Expose to window --------
    window.registerUser = registerUser;
    window.loginUser = loginUser;
    window.getCurrentUser = getCurrentUser;
    window.logoutUser = logoutUser;
    window.saveUser = saveUser;
    window.applyPreferences = applyPreferences;
  
  })();
  