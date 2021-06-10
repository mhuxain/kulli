const menuItems = [
    {path: "/auth", label: "Auth",  icon: "mdi-account-group", iconColor: 'pink-8', permission: ""},
    {
        label: 'Config',
        icon: 'mdi-cog',
        iconColor: 'brown-5',
        iconAlt: 'pages',
        permission: 'menu_tariffs',
        model: false,
        subMenus: [
            {path: "/islands", label: "User List",  icon: "mdi-cog", permission: ""},
            {path: "/atolls", label: "Roles",  icon: "mdi-cog", permission: ""},
            {path: "/organizations", label: "Organizations",  icon: "mdi-cog", permission: ""},

        ],
    },
]
export default menuItems