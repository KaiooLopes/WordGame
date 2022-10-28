import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
        <p>Created by <a href="https://kaioportfolio.netlify.app" target="_blank">Kaio</a></p>
        <div className={styles.icons}>
          <a><i class="fa-brands fa-instagram"></i></a>
          <a><i class="fa-brands fa-linkedin-in"></i></a>
          <a><i class="fa-brands fa-github-alt"></i></a>
        </div>
    </div>
  )
}

export default Footer