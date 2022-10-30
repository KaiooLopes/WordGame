import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
        <p>Created by <a href="https://kaioportfolio.netlify.app" target="_blank">Kaio</a></p>
        <div className={styles.icons}>
          <a href="https://www.instagram.com/kaio_al1/" target="_blank"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.linkedin.com/in/kaio-alves-lopes-3a1057245/" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="https://github.com/KaiooLopes" target="_blank"><i className="fa-brands fa-github-alt"></i></a>
        </div>
    </div>
  )
}

export default Footer