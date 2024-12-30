<template>
  <div class="nav-content">
    <div class="nav-container">
      <el-menu 
        :default-active="activeMenu" 
        mode="horizontal" 
        @select="handleSelect"
        class="navbar"
        background-color="#fff"
        text-color="#333"
        active-text-color="#74b9ff">
        
        <div class="logo-container" @click="goHome">
          <img src="@/assets/logo.png" alt="Logo" class="logo">
          <span class="logo-text">PaperXie</span>
        </div>
        <el-menu-item index="1">论文写作</el-menu-item>
        <el-menu-item index="2">论文查重</el-menu-item>
        <el-menu-item index="3">降重复写</el-menu-item>
        <el-menu-item index="4">推广赚钱</el-menu-item>
        <el-menu-item index="5">报告下载</el-menu-item>
        <el-menu-item index="6">行业资讯</el-menu-item>
        
        <div class="navbar-right">
          <div class="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
              <circle cx="50" cy="35" r="25" fill="#74b9ff" opacity="0.2"/>
              <path d="M10 90 Q50 60 90 90" fill="#74b9ff" opacity="0.2"/>
              <circle cx="50" cy="30" r="3" fill="#74b9ff"/>
              <path d="M45 80 L50 75 L55 80" stroke="#74b9ff" fill="none"/>
            </svg>
          </div>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      activeMenu: '1',
      routeMap: {
        '1': { path: '/writing', query: { type: 'thesis' } },
        '2': { path: '/check' },
        '3': { path: '/rewrite' },
        '4': { path: '/promote' },
        '5': { path: '/download' },
        '6': { path: '/news' }
      }
    }
  },
  created() {
    // 根据当前路由设置激活项
    this.activeMenu = this.$route.path
  },
  methods: {
    handleSelect(key) {
      this.activeMenu = key
      const route = this.routeMap[key]
      if (route) {
        this.$router.push(route).catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            throw err
          }
        })
      }
    },
    goHome() {
      this.$router.push('/').catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
      this.activeMenu = '/'
    }
  },
  watch: {
    // 监听路由变化
    '$route'(to) {
      this.activeMenu = to.path
    }
  }
}
</script>

<style scoped>
.nav-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  height: 60px;
  border: none;
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  cursor: pointer;
}

.logo {
  height: 32px;
  margin-right: 8px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.navbar-right {
  margin-left: auto;
  padding-right: 20px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.avatar:hover {
  background: rgba(116, 185, 255, 0.1);
}

.el-menu-item {
  font-size: 14px;
  padding: 0 16px;
  height: 60px;
  line-height: 60px;
}

.hot-tag {
  position: relative;
  top: -8px;
  font-size: 12px;
  color: #f56c6c;
  margin-left: 2px;
}
</style>