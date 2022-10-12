package com.example.ManShop.security;

import com.example.ManShop.Entitys.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class UserDetailsIpml implements UserDetails {
    private static final long serialVersionUID = 1L;

    private String username;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;
    @JsonIgnore
    private  String password;
    private int phone;
    private boolean activated ;


    public UserDetailsIpml(String username, String email, Collection<? extends GrantedAuthority> authorities, String password, int phone, boolean activated) {
        this.username = username;
        this.email = email;
        this.authorities = authorities;
        this.password = password;
        this.phone = phone;
        this.activated = activated;
    }

    public static UserDetailsIpml build(Users user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getRoles().getRolename()));
        return new UserDetailsIpml(user.getUsername(),user.getEmail(),authorities, user.getPassword(), user.getPhone(), user.getActivated());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.activated;
    }

}
