import React, { useState } from 'react';
import './HelpCenterSection.css';

const HelpCenterSection = ({ isNavOpen }) => {
  const [currentSection, setCurrentSection] = useState('provably fair');
  const [gameType, setGameType] = useState('dice');

  const handleGameTypeChange = (e) => {
    setGameType(e.target.value);
  };

  return (
    <div className={`help-center ${isNavOpen ? 'help-center-extended' : ''}`}>
      <div className="help-center-header">
        <span>Help Center</span>
      </div>
      <div className="help-center__action-items">
        <div className="help-center_navs">
          <div
            onClick={() => setCurrentSection('provably fair')}
            className={`help-center_nav ${
              currentSection === 'provably fair' ? 'help-center_nav-active' : ''
            }`}
          >
            <span>Provably Fair</span>
          </div>
          <div
            onClick={() => setCurrentSection('privacy policy')}
            className={`help-center_nav ${
              currentSection === 'privacy policy'
                ? 'help-center_nav-active'
                : ''
            }`}
          >
            <span>Privacy Policy</span>
          </div>
          <div
            onClick={() => setCurrentSection('terms of service')}
            className={`help-center_nav ${
              currentSection === 'terms of service'
                ? 'help-center_nav-active'
                : ''
            }`}
          >
            <span>Terms of Service</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Coin Accuracy Limit</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Support</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Fee</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Authenticator</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>FAQ's</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Currency</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Registration & Login</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Protecting Minors</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Self-Exclusion</span>
          </div>
          <div
            onClick={() => setCurrentSection('provably fair')}
            className="help-center_nav"
          >
            <span>Responsible Gambling</span>
          </div>
        </div>
        <div className="help-center_game-desc">
          {currentSection === 'provably fair' && (
            <>
              <p>Game</p>
              <select name="game" id="game" onChange={handleGameTypeChange}>
                <option value="dice">Dice</option>
                <option value="crash">Crash</option>
              </select>
              {gameType === 'dice' ? (
                <>
                  <p>Fairness</p>
                  <h4>How are results calculated</h4>
                  <p>To get the results</p>
                  <ul>
                    <li>
                      First we calculate the hash value of the combination with
                      HMAC_SHA256. This gives us a 64-character hexadecimal
                      string: hash = HMAC_SHA256 (clientSeed:nonce, serverSeed).
                    </li>
                    <li>
                      Finally, we take 8 characters of the hash and convert it
                      to an int32 value. Then we divide the converted value by
                      0x100000000, multiply it by 10001 and divide it by 100 so
                      that the resulting number conforms to the constraints of
                      the dice range.
                    </li>
                  </ul>
                  <p>
                    Note: A new seed must be set to verify the previous data
                    (the server seed is encrypted).
                  </p>
                  <p>
                    Did you really need to know this? Probably not. It’s there
                    for those who expect transparency and precision in a
                    provably fair game of chance.
                  </p>
                  <p>We put our "cards on the table."</p>
                  <p>Good luck!</p>
                  <button className="help-center_game-desc-btn">
                    Validate
                  </button>
                </>
              ) : (
                <>
                  <p>Fairness</p>
                  <p>Is the Game Fair?</p>
                  <p>
                    We are a fair and impartial prediction and guessing
                    platform. Our goal is to eliminate all unfair factors and
                    make players feel comfortable and have fun.
                    <br />
                    We have generated a total of 10 million hashes (the
                    generation chain is verifiable), and each hash corresponds
                    to a Crash multiplier. <br />
                    We release these 10 million numbers in reverse order, each
                    corresponding to one turn of the game (i.e. we have 10
                    million turns in total). <br />
                    In other words, the crash number of each turn already exists
                    and is not calculated after the game starts. Players can
                    therefore place their bet without concern. <br />
                    Will The Game Be Manipulated By The Platform?
                    <span className="github-verify"> Github Verify</span>
                    <br />
                    The integrity check value is key to verifying whether there
                    is any official manipulation; The test algorithm is provided
                    as follows. <br />
                    Example:
                    6b5124897c3c48d0e46cc9249f08c7e560792459f1bad1171224643b5d2be231
                  </p>
                  <ol>
                    <li>
                      Take a random value in the 2^52 range, namely 16^13, i.e.
                      a 13-bit hexadecimal number (because the hash value is
                      hexadecimal, 2^52 === 16^13)6b5124897c3c4 (0x6b5124897c3c4
                      equals 1887939992208324 in the decimal system).
                    </li>
                    <li>
                      Distribute the random value to 0~1, by dividing it by the
                      maximum value of 13 fs, namely
                      0x6b5124897c3c4/0x10000000000000. Given the discrete
                      random nature of the hash value, we then can think that
                      any hash value can be transformed into a random number of
                      0~1, 1887939992208324/4503599627370496 =
                      0.419206889692064.
                    </li>
                    <li>
                      Make the house edge 1%. Further to calculate 99/(1-X),
                      where X is the random value calculated at Step 2. When X
                      is 0, the result is 99; when X is 1, the result is
                      positive infinite; when X is 0.01, the result is 100; when
                      X is less than 0.01, the result is less than 100.
                    </li>
                    <li>
                      Conclusion: The overall random number distribution is 99
                      to positive infinite; and when the random number
                      distribution is 0~0.01, the result is less than 100.
                    </li>
                    <li>99/(1-0.419206889692064) = 170.45656748150867</li>
                    <li>
                      All values less than 100 will be set to 100. In other
                      words, there is a probability of 1% that 100 will appear.
                      Round off the number and divide it by 100 to get the final
                      result.
                    </li>
                    <li>170/100 = 1.70</li>
                  </ol>
                  <p>
                    Conclusion: The hash value used in the game is inverse
                    ordered. Therefore, with the SHA256 algorithm, a previous
                    hash used in the game can be calculated from its subsequent
                    hash. Since there is one-to-one correspondence between the
                    key and the value of hash, we can draw the conclusion that
                    if a hash can be used to calculate the hash that precedes
                    it, then this hash should have been already generated when
                    the preceding prize is announced. Similarly, the entire hash
                    chain is generated at the very beginning and cannot be
                    changed once generated. Otherwise, it cannot pass
                    verification by SHA256, and as far as the payout is
                    concerned, this is nothing more than a probability game in
                    which crash is a given. The official organizer cannot
                    manipulate any game set. Therefore, CRASH is more
                    transparent than other gambling methods. This is the
                    cornerstone on which our game is built. <br />
                    Simple Calculation: <br />
                    When the 13-bit hash value is 8000000000000 = 1.98,
                    0xb000000000 = 3.168, 0xc000000000 = 3.96, that is, the
                    first digit is greater than 8((16-8)/16≈0.5), the result is
                    approximately 2x; when the first digit is greater than
                    b((16-11)/16≈0.3), the result is approximately 3x; and when
                    the first digit is greater than c((16-12)/16≈0.25), the
                    result is approximately 4x, and the same rule applies to the
                    rest. <br />
                  </p>
                  <p>
                    When the 13-bit hash value is f000000000000 = 15.84,
                    ff00000000000 = 253.44, fff000000
                  </p>
                  <button className="help-center_game-desc-btn">
                    Validate
                  </button>
                </>
              )}
            </>
          )}
          {currentSection === 'privacy policy' && (
            <>
              <p className="privacy-policy_header">
                Personal Data Collected from You
              </p>
              <p>
                When you apply for commercial credit, activate our service,
                register for a service on the ELITEPLAY website, connect to our
                services, contact us (including by social media), participate in
                an online survey, or otherwise interact with the ELITEPLAY, we
                may collect a variety of information, including:
              </p>
              <ol>
                <li className="privacy-policy_list">
                  Account Information. Your ELITEPLAY ID and related account
                  details, including email address, devices registered, account
                  status, and age.
                </li>
                <li className="privacy-policy_list">
                  Device Information. Data from which your device could be
                  identified, such as device serial number, or about your
                  device, such as browser type.
                </li>
                <li className="privacy-policy_list">
                  Contact Information. Data such as name, email address,
                  physical address, phone number, or other contact information.
                </li>
                <li className="privacy-policy_list">
                  Payment Information. Data about your billing address and
                  method of payment, such as bank details, credit, debit, or
                  other payment card information.
                </li>
                <li className="privacy-policy_list">
                  Fraud Prevention Information. Data used to help identify and
                  prevent fraud, including a device trust score and KYC
                  information.
                </li>
                <li className="privacy-policy_list">
                  Usage Data. Data about your activity on and use of our
                  offerings, such as service launches, including browsing
                  history; product interaction; crash data, performance and
                  other diagnostic data; and other usage data.
                </li>
                <li className="privacy-policy_list">
                  Other Information You Provide to Us. Details such as the
                  content of your communications with Apple, including
                  interactions with customer support and contacts through social
                  media channels.
                </li>
              </ol>
              <p style={{ marginBottom: '2rem' }}>
                In some cases, ELITEPLAY may collect "sensitive" personal
                information. (including information about race and national
                origin, political opinions, religious beliefs and other beliefs
                of a similar nature, trade union. membership, and information
                about sex life or sexual orientation), or health information,
                and where permitted by law relating to, alleging or
                substantiated criminal information.
              </p>
              <p className="privacy-policy_header">Use of Personal Data</p>
              <p>
                We may combine and use information we hold about you (including
                information received on and off our Services) to understand how
                you use and interact with our Services and to understand who you
                are connected to and interested in. things to provide,
                personalize and improve our services. We may also use the
                information we hold about you globally for the following
                purposes
              </p>
              <ol>
                <li className="privacy-policy_list">
                  Provide, maintain, improve and develop related functionality,
                  content and services.
                </li>
                <li className="privacy-policy_list">
                  Analyze your content and other information.
                </li>
                <li>
                  Fulfill your requirements and use when authorized by you.
                </li>
                <li className="privacy-policy_list">
                  Help connect advertisers and application/website operators to
                  provide relevant advertisements in their applications and
                  websites.
                </li>
                <li className="privacy-policy_list">
                  Match and serve targeted marketing ads (regardless of device
                  or use of our services) and provide targeted marketing ads
                  based on your device activity, estimated interests and
                  targeting information.
                </li>
                <li className="privacy-policy_list">
                  Contact you with account-related information, or send
                  marketing messages according to your wishes.
                </li>
                <li className="privacy-policy_list">
                  Associate your activities on our various services and your
                  different devices, and associate all accounts you may use on
                  various ELITEPLAY services. We may associate activity and
                  accounts under a single user ID.
                </li>
                <li className="privacy-policy_list">
                  Conduct or support marketing promotion activities.
                </li>
                <li className="privacy-policy_list">
                  Conduct research and support innovation.
                </li>
                <li className="privacy-policy_list">
                  Provide analysis and reports on the usage and trends of our
                  services and advertising to external parties (including
                  partners, application/website operators, advertisers,
                  applications, third parties and the public), including
                  displaying and reporting to partners Trends related to public
                  preferences, ad performance, and user experience information.
                  These analyzes and reports may include aggregated or
                  pseudonymized information.
                </li>
                <li className="privacy-policy_list">
                  Provide services, ads, search results, and other content that
                  match your targeting settings based on your targeting
                  information.
                </li>
                <li className="privacy-policy_list">
                  Combine the information we hold about you with information we
                  obtain from business partners or other companies (such as your
                  activity on other websites and apps).
                </li>
                <li
                  style={{ marginBottom: '2rem' }}
                  className="privacy-policy_list"
                >
                  Detects and prevents fraud, abuse or illegal activity.
                </li>
              </ol>
              <p className="privacy-policy_header">
                Sharing and Disclosing of Personal Data
              </p>
              <ol>
                <li>Disclosure to Other Data Controllers</li>
                <p>
                  In order to achieve the above purposes, our company will share
                  your personal details within companies belonging to the same
                  ELITEPLAY series.
                </p>
                <p>
                  We will also disclose your personal details to other third
                  party data controllers with your consent (where required by
                  applicable law) or to provide any services you request (such
                  as third party integrations). The Services may also be used by
                  third party data controllers to collect and process your
                  personal details. If you use an email address associated with
                  a business domain to access ELITEPLAY’s services, our company
                  may provide your personal details to that business.
                </p>
                <li>
                  Disclosure of Information for Fraud Prevention and Security
                  Considerations
                </li>
                <p>
                  We will disclose personal details to companies that help us
                  operate our business to detect, prevent or otherwise address
                  fraud, deception, illegal activity, abuse of BC.GAME services,
                  and security or technical issues.
                </p>
                <p>
                  In addition, if the Company believes in good faith that
                  access, use, preservation or disclosure of information is
                  reasonably necessary to detect, prevent or avoid such fraud,
                  deceptive or illegal activities, abuse of services and
                  software, or security or technical issues, or is reasonably
                  necessary , in accordance with legal regulations and
                  permission, in order to protect the rights, property or safety
                  of our employees, ELITEPLAY users, children or the public, our
                  company will disclose personal details to companies,
                  organizations, government agencies or individuals other than
                  us.
                </p>
                <li>Disclosure to Data Processors</li>
                <p>
                  For the purposes identified above, we will also disclose your
                  personal details to companies that process personal details on
                  our behalf to assist us in performing our business. Such
                  companies include customer support service providers
                  (including providers who record or store communications),
                  analytics technology providers (including session reenactment
                  partners) who record and analyze your interactions with our
                  website to help us improve user experience ), payment
                  processing services, fraud monitoring and prevention,
                  detection and protection against fraudulent or illegal
                  activity or abuse of our services, email, social media, and
                  other marketing platforms and service providers, and hosting
                  services. We have entered into agreements with these companies
                  as required by applicable law and require these companies to
                  protect your personal details in accordance with these Privacy
                  Principles.
                </p>
                <li>Other Data Disclosed</li>
                <p>
                  We may also disclose your personal details in the following
                  circumstances:
                </p>
                <p style={{ display: 'flex', gap: '5px' }}>
                  <span className="grey-circle"> </span>When you consent to
                  disclosure;
                </p>
                <p style={{ display: 'flex', gap: '5px' }}>
                  <span className="grey-circle"></span> If we believe in good
                  faith that we are required to provide information in response
                  to a subpoena, court order, or other applicable law or legal
                  process or to respond to an emergency involving a danger of
                  death or serious bodily injury;
                </p>
                <p style={{ display: 'flex', gap: '5px' }}>
                  <span className="grey-circle"></span>
                  If the Company merges with or is acquired by another company,
                  sells the ELITEPLAY website, application or business unit, or
                  if all or substantially all of the Company's assets are
                  acquired by another company, your information may be disclosed
                  to potential purchasers, the Company's advisors and the
                  advisors of any potential purchaser, and will be one of the
                  assets transferred to the new ownership.
                </p>
              </ol>
              <p
                style={{ display: 'flex', gap: '5px' }}
                className="privacy-policy_header"
              >
                <span className="header-circle"></span>
                Protection of Personal Data
              </p>
              <p>
                The ELITEPLAY uses administrative, technical, and physical
                safeguards to protect your personal data, taking into account
                the nature of the personal data and the processing, and the
                threats posed. The ELITEPLAY is constantly working to improve on
                these safeguards to help keep your personal data secure.
              </p>
              <p
                style={{ display: 'flex', gap: '5px' }}
                className="privacy-policy_header"
              >
                <span className="header-circle"></span>
                External Links from The ELITEPLAY Website
              </p>
              <p>
                The ELITEPLAY website may provide Internet links to other
                websites. You can also click to enter other websites through the
                links provided by our website. However, the privacy policy of
                our website does not apply to the linked website. You must refer
                to the privacy policy of the linked website.
              </p>
              <p
                style={{ display: 'flex', gap: '5px' }}
                className="privacy-policy_header"
              >
                <span className="header-circle"></span>
                Cookies
              </p>
              <p>
                The ELITEPLAY may set and access cookies on your computer when
                you visit https://ELITEPLAY.COM and any pages or websites under
                the ELITEPLAY’ brand. Cookies are used to provide our system
                with the basic information to provide the services you are
                requesting. Cookies can be cleared at any time from your
                internet browser settings.
              </p>
              <p
                style={{ display: 'flex', gap: '5px' }}
                className="privacy-policy_header"
              >
                <span className="header-circle"></span>
                Changes to Our Privacy Policy
              </p>
              <p>
                We may make changes to our Privacy Policy in the future,
                however, the most current version of the policy will govern our
                processing of your personal data and will always be available to
                you. If we make a change to this policy that, in our sole
                discretion, is material, we will notify you by an update or
                email, where possible. By continuing to access or use our
                services, you agree to be bound to the terms of our Privacy
                Policy.
              </p>
              <p>
                The ELITEPLAY is committed to protecting the privacy of your
                personal information online. If you have any questions or
                comments about our management of your personal information,
                please contact us. If you have any questions about this privacy
                statement, you can also report it to us. If you are not
                satisfied with the response you receive, you can continue to
                report your concerns to us.
              </p>
              <p>
                We will confirm your request within three (3) days and strive to
                resolve your problem within one (1) month after receipt or
                within an appropriate period not exceeding the legal
                requirements. If the relevant issue is more complex or a large
                number of issues are received, we will notify you that it will
                take more than 1 month to resolve the issue, and we will try to
                resolve your issue within 2 months after we first receive the
                issue. We ma y accept your question in accordance with the law.
                We may reject requests that are unreasonable or outside legal
                requirements, including requests that are highly impractical,
                require a disproportionate amount of technical effort, or may
                expose us to operational risks such as condoning fraud.
              </p>
            </>
          )}
          {currentSection === 'terms of service' && (
            <>
              <p className="privacy-policy_header">Terms of Service</p>
              <p>
                By clicking the "I Agree" button if and where provided and/or
                using the Service, you as the user ("You"; "Your"; "User")
                consent to the terms and conditions set forth in this
                Agreement. BY registering on the ELITEPLAY website (the
                “Website”), You are hereby entering into a legally binding
                contract with Us, and You agree to be bound by our Terms of
                Service, Privacy Policy/Cookies Policy and other rules
                applicable to betting or gaming products as referenced in our
                Terms of Service.
              </p>
              <ol>
                <li className="privacy-policy_list">Grant of License</li>
                <ul>
                  <li className="privacy-policy_list">
                    1.1. Subject to the terms and conditions contained herein,
                    BC.GAME grants the User a non-exclusive, personal,
                    non-transferable right to use the Service on your personal
                    computer or other device that accesses the Internet in order
                    to access the games available
                  </li>
                  <li className="privacy-policy_list">
                    1.2. The Service is not for use by (i) individuals under 18
                    years of age, (ii) individuals under the legal age of
                    majority in their jurisdiction and (iii) individuals
                    accessing the Service from jurisdictions from which it is
                    illegal to do so. ELITEPLAY is not able to verify the
                    legality of the Service in each jurisdiction and it is the
                    User’s responsibility to ensure that their use of the
                    Service is lawful.
                  </li>
                  <li className="privacy-policy_list">
                    1.3. ELITEPLAY and its licensors are the sole holders of all
                    rights in and to the Service and code, structure and
                    organization, including copyright, trade secrets,
                    intellectual property and other rights. You may not, within
                    the limits prescribed by applicable laws: (a) copy,
                    distribute, publish, reverse engineer, decompile,
                    disassemble, modify, or translate the website; or (b) use
                    the Service in a manner prohibited by applicable laws or
                    regulations (each of the above is an "Unauthorized Use").
                    ELITEPLAY reserves any and all rights implied or otherwise,
                    which are not expressly granted to the User hereunder and
                    retain all rights, title and interest in and to the Service.
                    You agree that you will be solely liable for any damage,
                    costs or expenses arising out of or in connection with the
                    commission by you of any Unauthorized Use. You shall notify
                    ELITEPLAY immediately upon becoming aware of the commission
                    by any person of any Unauthorized Use and shall provide
                    ELITEPLAY with reasonable assistance with any investigations
                    it conducts in light of the information provided by you in
                    this respect.
                  </li>
                  <li className="privacy-policy_list">
                    1.4. The term "ELITEPLAY", its domain names and any other
                    trade marks, or service marks used by ELITEPLAY as part of
                    the Service (the "Trade Marks"), are solely owned by
                    ELITEPLAY In addition, all content on the website,
                    including, but not limited to, the images, pictures,
                    graphics, photographs, animations, videos, music, audio and
                    text (the "Site Content") belongs to ELITEPLAY and is
                    protected by copyright and/or other intellectual property or
                    other rights. You hereby acknowledge that by using the
                    Service, you obtain no rights in the Site Content and/or the
                    Trade Marks, or any part thereof. Under no circumstances may
                    you use the Site Content and/or the Trade Marks without
                    ELITEPLAY’s prior written consent. Additionally, you agree
                    not to do anything that will harm or potentially harm the
                    rights, including the intellectual property rights of
                    ELITEPLAY
                  </li>
                </ul>
                <li className="privacy-policy_list">No warranties</li>
                <ul>
                  <li className="privacy-policy_list">
                    2.1. ELITEPLAY disclaims any and all warranties, expressed
                    or implied, in connection with the service which is provided
                    to you "as is" and we provide you with no warranty or
                    representation whatsoever regarding its quality, fitness for
                    purpose, completeness or accuracy.
                  </li>
                  <li className="privacy-policy_list">
                    2.2. Regardless of ELITEPLAY’s efforts, ELITEPLAY makes no
                    warranty that the service will be uninterrupted, timely or
                    error-free, or that defects will be corrected.
                  </li>
                </ul>
                <li className="privacy-policy_list">
                  Authority/Terms of Service You agree to the game rules
                  described on the ELITEPLAY website. ELITEPLAY retains
                  authority over the issuing, maintenance, and closing of the
                  Service. The decision of ELITEPLAY’s management, concerning
                  any use of the Service, or dispute resolution, is final and
                  shall not be open to review or appeal.
                </li>
                <li className="privacy-policy_list">
                  Your Obligations as a Player
                </li>
                <ul>
                  <li className="privacy-policy_list">
                    4.1. You hereby declare and warrant that:
                  </li>
                  <ul>
                    <li className="privacy-policy_list">
                      4.1.1. You are over 18 years of age or such a higher
                      minimum legal age of majority as stipulated if the
                      jurisdiction of Your residence (e.g. Estonia – 21 years)
                      and, under the laws applicable to You, legally allowed to
                      participate in the Games offered on the Website.
                    </li>
                    <li className="privacy-policy_list">
                      4.1.2. You participate in the Games strictly in your
                      personal non-professional capacity for recreational and
                      entertainment reasons only.
                    </li>
                    <li className="privacy-policy_list">
                      4.1.3. You participate in the Games on your own behalf and
                      not on behalf of any other person.
                    </li>
                    <li className="privacy-policy_list">
                      4.1.4. All information that You provide to ELITEPLAY
                      during the term of validity of this agreement is true,
                      complete, and correct, and that You shall immediately
                      notify BC.GAME of any change of such information.
                    </li>
                    <li className="privacy-policy_list">
                      4.1.5. You are solely responsible for reporting and
                      accounting for any taxes applicable to You under relevant
                      laws for any winnings that You receive from ELITEPLAY.
                    </li>
                    <li className="privacy-policy_list">
                      4.1.6. You understand that by participating in the Games
                      you take the risk of losing Virtual Funds deposited into
                      Your Member Account.
                    </li>
                    <li className="privacy-policy_list">
                      4.1.7. You shall not be involved in any fraudulent,
                      collusive, fixing or other unlawful activity in relation
                      to Your or third parties’ participation in any of the
                      Games and shall not use any software- assisted methods or
                      techniques or hardware devices for Your participation in
                      any of the Games. ELITEPLAY hereby reserves the right to
                      invalidate any wager in the event of such behavior
                    </li>
                    <li className="privacy-policy_list">
                      4.1.8. You understand that Virtual Funds as Bitcoin are
                      not considered a legal currency or tender and as such on
                      the Website they are treated as virtual funds with no
                      intrinsic value.
                    </li>
                    <li className="privacy-policy_list">
                      4.1.9. You understand that Bitcoin value can change
                      dramatically depending on the market value
                    </li>
                    <li className="privacy-policy_list">
                      4.1.10. You are not allowed to use any payment methods
                      that belong to a Third party or person.
                    </li>
                  </ul>
                  <li className="privacy-policy_list">
                    4.2. You are not allowed to transfer, sell and/or acquire,
                    user accounts.
                  </li>
                  <li className="privacy-policy_list">
                    4.3. Games played on Our site should be played in the same
                    manner as games played in any other setting. This means that
                    players should be courteous to each other and avoid rude or
                    obscene comments.
                  </li>
                  <li className="privacy-policy_list">
                    4.4. Some circumstances may arise where a wager is
                    confirmed, or a payment is performed by us in error. In all
                    these cases ELITEPLAY reserves the right to cancel all the
                    wagers accepted containing such an error.
                  </li>
                  <li className="privacy-policy_list">
                    4.5. Should the user become aware of possible errors or
                    incompleteness in the software, he/she agrees to refrain
                    from taking advantage of them. Moreover, the user agrees to
                    report any error or incompleteness immediately to ELITEPLAY
                    Should the user fail to fulfil the obligations stated in
                    this clause, ELITEPLAY has a right to full compensation for
                    all costs related to the error or incompleteness, including
                    any costs incurred in association with the respective
                    error/incompleteness and the failed notification by the
                    user.
                  </li>
                  <li className="privacy-policy_list">
                    4.6. In the event a game is started but miscarried because
                    of a failure of the system, ELITEPLAY shall refund the
                    amount wagered in the game to the User by crediting it to
                    the User’s Account or, if the account no longer exists, by
                    paying it to the User in an approved manner; and if the User
                    has an accrued credit at the time the game miscarried,
                    credit to the User’s Account the monetary value of the
                    credit or, if the account no longer exists, pay it to the
                    User in an approved manner.
                  </li>
                  <li className="privacy-policy_list">
                    4.7. ELITEPLAY reserves the right to reject or limit wagers.
                    The user is not permitted to wager an amount exceeding
                    his/her personal account. Wins are credited to the personal
                    account of the user.
                  </li>
                  <li className="privacy-policy_list">
                    4.8. ELITEPLAY reserves the right to retain payments, if
                    suspicion or evidence exists of manipulation of the casino
                    system. Criminal charges will be brought against any user or
                    any other person(s), who has/have manipulated the casino
                    system or attempted to do so. ELITEPLAY reserves the right
                    to terminate and/or, change any games or events being
                    offered on the Website.
                  </li>
                  <li className="privacy-policy_list">
                    4.9. We reserve the right to require some verification in
                    case of suspicious or fraudulent transactions.
                  </li>
                  <li className="privacy-policy_list">
                    4.10.ELITEPLAY reserves the right to declare a wager void
                    partially or in full if ELITEPLAY, at its own discretion,
                    would deem it obvious that any of the following
                    circumstances have occurred:
                  </li>
                  <ul>
                    <li className="privacy-policy_list">
                      4.10.1. You, or people associated with you may directly or
                      indirectly influence the outcome of an event, to obtain an
                      unlawful advantage,
                    </li>
                    <li className="privacy-policy_list">
                      4.10.2. You and or people associated with you are directly
                      or indirectly avoiding the rules of ELITEPLAY
                    </li>
                    <li className="privacy-policy_list">
                      4.10.3. The result of an event has been directly or
                      indirectly affected by criminal activity.
                    </li>
                    <li className="privacy-policy_list">
                      4.10.4. Wagers have been placed that would not have been
                      accepted otherwise, but that were accepted during periods
                      when the website have been affected by technical problems.
                    </li>
                    <li className="privacy-policy_list">
                      4.10.5. Due to an error, such as a, misprint, technical
                      error, force majeure or otherwise, wagers have been
                      offered, placed and or accepted due to this error.
                    </li>
                    <li className="privacy-policy_list">
                      4.10.6. If a player's deposit fee is too low and is
                      flagged by blockchain or similar site as “not enough fee
                      to relay” ELITEPLAY reserve the right to confiscate the
                      winnings if ELITEPLAY at their own discretion deem the
                      transaction and behavior of the player to be fraudulent in
                      nature.
                    </li>
                  </ul>
                  <li className="privacy-policy_list">
                    4.11. You will inform ELITEPLAY immediately if you enter
                    into a self-exclusion agreement with any gambling provider.
                  </li>
                </ul>
                <li className="privacy-policy_list">Prohibited Uses</li>
                <ul>
                  <li className="privacy-policy_list">
                    5.1. PERSONAL USE. The Service is intended solely for the
                    User’s personal use. The User is only allowed to wager for
                    his/her personal entertainment and may not create multiple
                    accounts, including for the purpose of collusion and/or
                    abuse of service.
                  </li>
                  <li className="privacy-policy_list">
                    5.2. JURISDICTIONS. Persons located in or residents of
                    Aruba, Bonaire, Curacao, France, Netherlands, Saba, Statia,
                    St Martin, USA (the ”Prohibited Jurisdictions”) are not
                    permitted make use of the Service. For the avoidance of
                    doubt, the foregoing restrictions on engaging in real-money
                    play from Prohibited Jurisdictions applies equally to
                    residents and citizens of other nations while located in a
                    Prohibited Jurisdiction. Any attempt to circumvent the
                    restrictions on play by any persons located in a Prohibited
                    Jurisdiction or Restricted Jurisdiction, is a breach of this
                    Agreement. An attempt at circumvention includes, but is not
                    limited to, manipulating the information used by ELITEPLAY
                    to identify your location and providing BC.GAME with false
                    or misleading information regarding your location or place
                    of residence.
                  </li>
                </ul>
                <li className="privacy-policy_list">
                  Know your Customer (“KYC”)
                </li>
                <p>
                  ELITEPLAY reserves the right, at any time, to ask for any KYC
                  documentation it deems necessary to determine the identity and
                  location of a User. ELITEPLAY reserves the right to restrict
                  service and payment until identity is sufficiently determined.
                </p>
                <li>Breach</li>
                <ul>
                  <li className="privacy-policy_list">
                    7.1. Without prejudice to any other rights, if a User
                    breaches in whole or in part any provision contained herein,
                    ELITEPLAY reserves the right to take such action as it sees
                    fit, including terminating this Agreement or any other
                    agreement in place with the User and/or taking legal action
                    against such User.
                  </li>
                  <li className="privacy-policy_list">
                    7.2. You agree to fully indemnify, defend and hold harmless
                    ELITEPLAY and its shareholders, directors, agents and
                    employees from and against all claims, demands, liabilities,
                    damages, losses, costs and expenses, including legal fees
                    and any other charges whatsoever, howsoever caused, that may
                    arise as a result of: (i) your breach of this Agreement, in
                    whole or in part; (ii) violation by you of any law or any
                    third party rights; and (iii) use by you of the Service.
                  </li>
                </ul>
                <li className="privacy-policy_list">
                  Limitations and Liability
                </li>
                <ul>
                  <li className="privacy-policy_list">
                    8.1. Under no circumstances, including negligence, shall
                    ELITEPLAY be liable for any special, incidental, direct,
                    indirect or consequential damages whatsoever (including,
                    without limitation, damages for loss of business profits,
                    business interruption, loss of business information, or any
                    other pecuniary loss) arising out of the use (or misuse) of
                    the Service even if ELITEPLAY had prior knowledge of the
                    possibility of such damages.
                  </li>
                  <li className="privacy-policy_list">
                    8.2. Nothing in this Agreement shall exclude or limit
                    ELITEPLAY’s liability for death or personal injury resulting
                    from its negligence.
                  </li>
                </ul>
                <li className="privacy-policy_list">Disputes</li>
                <p>
                  If a User wishes to make a complaint, please contact
                  ELITEPLAY’s customer service team at support@ELITEPLAY. Should
                  any dispute not be resolved to your satisfaction you may
                  pursue remedies in the governing law jurisdiction set forth
                  below.
                </p>
                <li className="privacy-policy_list">Amendment</li>
                <p>
                  ELITEPLAY reserves the right to update or modify this
                  Agreement or any part thereof at any time or otherwise change
                  the Service without notice and you will be bound by such
                  amended Agreement upon posting. Therefore, we encourage you to
                  check the terms and conditions contained in the version of the
                  Agreement in force at such time. Your continued use of the
                  Service shall be deemed to attest to your agreement to any
                  amendments to the Agreement.
                </p>
                <li className="privacy-policy_list">Governing Law</li>
                <p>
                  The Agreement and any matters relating thereto shall be
                  governed by, and construed in accordance with, the laws of
                  Curacao. You irrevocably agree that, subject as provided
                  below, the courts of Curacao shall have exclusive jurisdiction
                  in relation to any claim, dispute or difference concerning the
                  Agreement and any matter arising therefrom and irrevocably
                  waive any right that it may have to object to an action being
                  brought in those courts, or to claim that the action has been
                  brought in an inconvenient forum, or that those courts do not
                  have jurisdiction. Nothing in this clause shall limit the
                  right of ELITEPLAY to take proceedings against you in any
                  other court of competent jurisdiction, nor shall the taking of
                  proceedings in any one or more jurisdictions preclude the
                  taking of proceedings in any other jurisdictions, whether
                  concurrently or not, to the extent permitted by the law of
                  such other jurisdiction.
                </p>
                <p>
                  If a provision of this Agreement is or becomes illegal,
                  invalid or unenforceable in any jurisdiction, that shall not
                  affect the validity or enforceability in that jurisdiction of
                  any other provision hereof or the validity or enforceability
                  in other jurisdiction of that or any other provision hereof.
                </p>
                <li className="privacy-policy_list">Assignment</li>
                <p>
                  ELITEPLAY reserves the right to assign this agreement, in
                  whole or in part, at any time without notice. The User may not
                  assign any of his/her rights or obligations under this
                  Agreement.
                </p>
                <li className="privacy-policy_list">ADVANTAGE PLAY</li>
                <p>
                  Should the Casino become aware of any user who has accepted
                  the bonus or a promotion with sole purpose of creating a
                  positive expected value on bonus return by using known
                  practices aimed at securing a cash out of said bonus or at any
                  way try to take advantage of bonuses received by ELITEPLAY,
                  then ELITEPLAY will enforce immediate confiscation of winnings
                  and closure of the account with the right to withhold any
                  further withdrawals. An example of advantage play would be
                  delaying any game round in any game, including free spins
                  features and bonus features, to a later time when you have no
                  more wagering requirement and/or performing new deposit(s)
                  while having free spins features or bonus features still
                  available in a game. In the interests of fair gaming, equal,
                  zero or low margin bets or hedge betting, shall all be
                  considered irregular gaming for bonus play- through
                  requirement purposes. Should the Casino deem that irregular
                  game play has occurred, the Casino reserves the right to
                  withhold any withdrawals and/or confiscate all winnings.
                </p>
              </ol>
              <p className="privacy-policy_header">User Agreement</p>
              <p>Definitions; ELITEPLAY is referred to as 'we' or 'us'.</p>
              <p>The Player is referred to as "you" or 'the Player'.</p>
              <p>
                'The Website' means ELITEPLAY through desktop, mobile or other
                platforms utilized by the Player.
              </p>
              <p>https://ELITEPLAY.COM/help/terms-service</p>
              <p className="privacy-policy_header">Definitions</p>
              <p>Definitions; ELITEPLAY is referred to as 'we' or 'us'.</p>
              <p>The Player is referred to as "you" or 'the Player'.</p>
              <p>
                'The Website' means ELITEPLAY through desktop, mobile or other
                platforms utilized by the Player.
              </p>
              <ol>
                <li className="privacy-policy_list">General</li>
                <ul>
                  <li className="privacy-policy_list">
                    1.1. This User Agreement applies to the usage of games
                    accessible through ELITEPLAY.
                  </li>
                  <li className="privacy-policy_list">
                    1.2. This User Agreement comes into force as soon as you
                    complete the registration process, which includes checking
                    the box accepting this User Agreement and successfully
                    creating an account. By using any part of the Website
                    following account creation, you agree to this User
                    Agreement.
                  </li>
                  <li className="privacy-policy_list">
                    1.3. You must read this User Agreement carefully in their
                    entirety before creating an account. If you do not agree
                    with any provision of this User Agreement, you must not
                    create an account or continue to use the Website.
                  </li>
                  <li className="privacy-policy_list">
                    1.4. We are entitled to make amendments to this User
                    Agreement at any time and without advanced notice. If we
                    make such amendments, we may take appropriate steps to bring
                    such changes to your attention (such as by e-mail or placing
                    a notice on a prominent position on the Website, together
                    with the amended User Agreement) but it shall be your sole
                    responsibility to check for any amendments, updates and/or
                    modifications. Your continued use of ELITEPLAY services and
                    Website after any such amendment to the User Agreement will
                    be deemed as your acceptance and agreement to be bound by
                    such amendments, updates and/or modifications.
                  </li>
                  <li className="privacy-policy_list">
                    1.5. this User Agreement may be published in several
                    languages for informational purposes and ease of access by
                    players. The English version is the only legal basis of the
                    relationship between you and us and in the case of any
                    discrepancy with respect to a translation of any kind, the
                    English version of this User Agreement shall prevail.
                  </li>
                </ul>
                <li className="privacy-policy_list">Binding Declarations</li>
                <ul>
                  <li className="privacy-policy_list">
                    2.1. By agreeing to be bound by this User Agreement, you
                    also agree to be bound by the ELITEPLAY Rules and Privacy
                    Policy that are hereby incorporated by reference into this
                    User Agreement. In the event of any inconsistency, this User
                    Agreement will prevail. You hereby represent and warrant
                    that:
                  </li>
                  <ul>
                    <li className="privacy-policy_list">
                      2.1.1. You are over (a) 18 or (b) such other legal age or
                      age of majority as determined by any laws which are
                      applicable to you, whichever age is greater;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.2. You have full capacity to enter into a legally
                      binding agreement with us and you are not restricted by
                      any form of limited legal capacity;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.3. All information that you provide to us during the
                      term of validity of this agreement is true, complete,
                      correct, and that you shall immediately notify us of any
                      change of such information;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.4. You are solely responsible for reporting and
                      accounting for any taxes applicable to you under relevant
                      laws for any winnings that you receive from us;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.5. You understand that by using our services you take
                      the risk of losing money deposited into your Member
                      Account and accept that you are fully and solely
                      responsible for any such loss;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.6. You are permitted in the jurisdiction in which you
                      are located to use online casino services;{' '}
                    </li>
                    <li className="privacy-policy_list">
                      2.1.7. In relation to deposits and withdraws of funds into
                      and from your Member Account, you shall only use
                      Cryptocurrency that are valid and lawfully belong to you;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.8. You understand that the value of Cryptocurrency can
                      change dramatically depending on the market value;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.9. The computer software, the computer graphics, the
                      Websites and the user interface that we make available to
                      you are owned by ELITEPLAY or its associates and is
                      protected by copyright laws. You may only use the software
                      for your own personal, recreational uses in accordance
                      with all rules, User Agreement we have established and in
                      accordance with all applicable laws, rules and
                      regulations;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.10. You understand that Cryptocurrency is not
                      considered a legal currency or tender and as such on the
                      Website they are treated as virtual funds with no
                      intrinsic value.
                    </li>
                    <li className="privacy-policy_list">
                      2.1.11. You affirm that you are not an officer, director,
                      employee, consultant or agent of BC.GAME or working for
                      any company related to BC.GAME, or a relative or spouse of
                      any of the foregoing;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.12. You are not diagnosed or classified as a
                      compulsive or problem gambler. We are not accountable if
                      such problem gambling arises whilst using our services but
                      will endeavor to inform of relevant assistance available.
                      We reserve the right to implement cool off periods if we
                      believe such actions will be of benefit.
                    </li>
                    <li className="privacy-policy_list">
                      2.1.13. You accept and acknowledge that we reserve the
                      right to detect and prevent the use of prohibited
                      techniques, including but not limited to fraudulent
                      transaction detection, automated registration and signup,
                      gameplay and screen capture techniques. These steps may
                      include, but are not limited to, examination of Players
                      device properties, detection of geo-location and IP
                      masking, transactions and blockchain analysis;
                    </li>
                    <li className="privacy-policy_list">
                      2.1.14. You accept our right to terminate and/or change
                      any games or events being offered on the Website, and to
                      refuse and/or limit bets.
                    </li>
                    <li className="privacy-policy_list">
                      2.1.15. You accept that we have the right to ban/block
                      multiple accounts and freely control the assets in such
                      accounts.
                    </li>
                    <li className="privacy-policy_list">
                      2.1.16. You are aware of possible errors or incompleteness
                      in the software, you agree to refrain from taking
                      advantage of them. Moreover, you agree to report any error
                      or incompleteness immediately to ELITEPLAY. Should you
                      fail to fulfil the obligations stated in this clause,
                      ELITEPLAY has a right to full compensation for all costs
                      related to the error or incompleteness, including any
                      costs incurred in association with the respective
                      error/incompleteness and the failed notification by the
                      user.
                    </li>
                    <li className="privacy-policy_list">
                      2.1.17. You are aware of that ELITEPLAY has the right to
                      carry out “KYC” (Know Your Customer) verification
                      procedures. The access to your user account may be blocked
                      or closed if we determine that you have supplied false or
                      misleading information
                    </li>
                  </ul>
                  <li className="privacy-policy_list">
                    2.2. We reserve the right to declare a wager void partially
                    or in full if ELITEPLAY, at its own discretion, would deem
                    it obvious that any of the following circumstances have
                    occurred:
                  </li>
                  <ul className="privacy-policy_list">
                    <li className="privacy-policy_list">
                      2.2.1. You, or people associated with you, may directly or
                      indirectly influence the outcome of an event, to obtain an
                      unlawful advantage.
                    </li>
                    <li className="privacy-policy_list">
                      2.2.2. You and or people associated with you are directly
                      or indirectly avoiding the rules of ELITEPLAY.
                    </li>
                    <li className="privacy-policy_list">
                      2.2.3. The result of an event has been directly or
                      indirectly affected by criminal activity.
                    </li>
                    <li className="privacy-policy_list">
                      2.2.4. Wagers have been placed that would not have been
                      accepted otherwise, but that were accepted during periods
                      when the website has been affected by technical problems.
                    </li>
                    <li className="privacy-policy_list">
                      2.2.5. Due to an error, such as a mistake,
                      vulnerabilities, technical error, force majeure or
                      otherwise, wagers have been offered, placed and or
                      accepted due to this error.
                    </li>
                    <li className="privacy-policy_list">
                      2.2.6. If a player's deposit fee is too low and is flagged
                      by blockchain or similar site as “not enough fee to relay”
                      ELITEPLAY reserves the right to confiscate the winnings if
                      ELITEPLAY at their own discretion deems the transaction
                      and behavior of the player to be fraudulent in nature.
                    </li>
                  </ul>
                </ul>
                <li className="privacy-policy_list">Restricted Territories</li>
                <ul>
                  <li className="privacy-policy_list">
                    3.1. Blacklisted Territories: China, Netherlands, Dutch
                    Caribbean Islands, Hungary, Australia, Ontario(Canada),
                    Curacao, France, United States and/or any other restricted
                    by law country or state. Note that it is strictly forbidden
                    to play on ELITEPLAY games in blacklisted countries
                    mentioned above your personal data for the purpose of
                    executing their duties and providing you with the best
                    possible assistance and service. You hereby consent to such
                    disclosures
                  </li>
                </ul>
                <li className="privacy-policy_list">General Betting Rules</li>
                <ul>
                  <li className="privacy-policy_list">
                    4.1. A bet can only be placed by a registered account
                    holder.
                  </li>
                  <li className="privacy-policy_list">
                    4.2. A bet can only be placed over the internet.
                  </li>
                  <li className="privacy-policy_list">
                    4.3. You can only place a bet if you have a sufficient
                    balance in your account with ELITEPLAY.
                  </li>
                  <li className="privacy-policy_list">
                    4.4. The bet, once concluded, will be governed by the
                    version of the User Agreement valid and available on the
                    Website at the time of the bet being accepted.
                  </li>
                  <li className="privacy-policy_list">
                    4.5. Any payout of a winning bet is credited to your
                    account, consisting of the stake multiplied by the odds at
                    which the bet was placed.
                  </li>
                  <li className="privacy-policy_list">
                    4.6.ELITEPLAY reserves the right to adjust a bet payout
                    credited to a ELITEPLAY account if it is determined by
                    ELITEPLAY in its sole discretion that such a payout has been
                    credited due to an error.
                  </li>
                  <li className="privacy-policy_list">
                    4.7. A bet, which has been placed and accepted, cannot be
                    amended, withdrawn, or cancelled by you.
                  </li>
                  <li className="privacy-policy_list">
                    4.8. The list of all the bets, their status and details are
                    available to you on the Website.
                  </li>
                  <li className="privacy-policy_list">
                    4.9. When you place a bet you acknowledge that you have read
                    and understood in full all of this User Agreement regarding
                    the bet as stated on the Website.
                  </li>
                  <li className="privacy-policy_list">
                    4.10. ELITEPLAY manages your account, and calculates the
                    available funds, the pending funds, the betting funds as
                    well as the amount of winnings. Unless proven otherwise,
                    these amounts are considered as final and are deemed to be
                    accurate.
                  </li>
                  <li className="privacy-policy_list">
                    4.11. You are fully responsible for the bets placed.
                  </li>
                  <li className="privacy-policy_list">
                    4.12. Winnings will be paid into your account after the
                    final result is confirmed.
                  </li>
                </ul>
                <li className="privacy-policy_list">Bonuses and Promotions</li>
                <ul>
                  <li className="privacy-policy_list">
                    5.1. ELITEPLAY reserves the right to cancel any promotion,
                    bonus or bonus program (including, but not limited to top-up
                    rewards, invite friends to reward bonuses and loyalty
                    programs) with immediate effect if we believe the bonus has
                    been set up incorrectly or is being abused, and if the said
                    bonus has been paid out, we reserve the right to decline any
                    Withdraw request and to deduct such amount from your
                    account. Whether or not a bonus is deemed to be set up
                    incorrectly or abused shall be determined solely by
                    ELITEPLAY.
                  </li>
                  <li className="privacy-policy_list">
                    5.2. If you use a Deposit Bonus, no Withdraw of your
                    original deposit will be accepted before you have reached
                    the requirements stipulated under the User Agreement of the
                    Deposit Bonus.
                  </li>
                  <li className="privacy-policy_list">
                    5.3. Where any term of the offer or promotion is breached or
                    there is any evidence of a series of bets placed by a
                    customer or group of customers, which due to a deposit
                    bonus, enhanced payments, free bets, risk free bets or any
                    other promotional offer results in guaranteed customer
                    profits irrespective of the outcome, whether individually or
                    as part of a group, ELITEPLAY reserves the right to reclaim
                    the bonus element of such offers and in their absolute
                    discretion either settle bets at the correct odds, void the
                    free bet bonus and risk free bets or void any bet funded by
                    the deposit bonus. In addition, ELITEPLAY reserves the right
                    to levy an administration charge on the customer up to the
                    value of the deposit bonus, free bet bonus, risk free bet or
                    additional payment to cover administrative costs. We further
                    reserve the right to ask any customer to provide sufficient
                    documentation for us to be satisfied in our absolute
                    discretion as to the customer's identity prior to us
                    crediting any bonus, free bet, risk free bet or offer to
                    their accoun
                  </li>
                  <li className="privacy-policy_list">
                    5.4. All ELITEPLAY offers are intended for recreational
                    players and ELITEPLAY may in its sole discretion limit the
                    eligibility of customers to participate in all or part of
                    any promotion.
                  </li>
                  <li className="privacy-policy_list">
                    5.5. ELITEPLAY reserves the right to amend, cancel, reclaim
                    or refuse any promotion at its own discretion.
                  </li>
                  <li className="privacy-policy_list">
                    5.6. Bonuses can only be received once per person/account,
                    family, household, address, e-mail address, IP addresses and
                    environments where computers are shared (university,
                    fraternity, school, public library, workplace, etc.). The
                    Operator reserves the right to close your account and
                    confiscate any existing funds if evidence of abuse/fraud is
                    found.
                  </li>
                  <li className="privacy-policy_list">
                    5.7. You acknowledge and understand that separate User
                    Agreement exist with respect to promotions, bonuses and
                    special offers, and are in addition to this User Agreement.
                    This User Agreement is set forth in the respective content
                    page on this website, or have been made available to you
                    personally, as the case may be. In the event of a conflict
                    between the provisions of such promotions, bonuses and
                    special offers, and the provisions of this User Agreement,
                    the provisions of such promotions, bonuses and special
                    offers will prevail.
                  </li>
                  <li className="privacy-policy_list">
                    5.8. We may insist that you bet a certain amount of your own
                    deposit before you can bet with any free/bonus funds we
                    credit to your account.
                  </li>
                  <li className="privacy-policy_list">
                    5.9. You accept that certain promotions may be subject to
                    Withdraw restrictions and/or requirements which need to be
                    met before funds credited under the promotion can be
                    withdrawn. Such terms shall be duly published and made
                    available as part of the promotion. If you opt to make a
                    Withdraw before the applicable wagering requirements are
                    fulfilled, we will deduct the whole bonus amount as well as
                    any winnings connected with the use of the bonus amounts
                    before approving any Withdraw.
                  </li>
                </ul>
                <li className="privacy-policy_list">Live Chat</li>
                <ul>
                  <li className="privacy-policy_list">
                    6.1. As part of your use of the Website we may provide you
                    with a live chat facility, which is moderated by us and
                    subject to controls. We reserve the right to review the chat
                    and to keep a record of all statements made on the facility.
                    Your use of the chat facility should be for recreational and
                    socializing purposes.
                  </li>
                  <li className="privacy-policy_list">
                    6.2. We have the right to remove the chat room functionality
                    or immediately terminate your Member Account and refund your
                    account balance if you:
                  </li>
                  <ul>
                    <li className="privacy-policy_list">
                      (a) make any statements that are sexually explicit or
                      grossly offensive, including expressions of bigotry,
                      racism, hatred or profanity;
                    </li>
                    <li className="privacy-policy_list">
                      (b) make statements that are abusive, defamatory or
                      harassing or insulting;
                    </li>
                    <li className="privacy-policy_list">
                      (c) use the chat facility to advertise, promote or
                      otherwise relate to any other online entities;
                    </li>
                    <li className="privacy-policy_list">
                      (d) make statements about ELITEPLAY, or any other Internet
                      site(s) connected to the Website that are untrue and/or
                      malicious and/or damaging to ELITEPLAY;
                    </li>
                    <li className="privacy-policy_list">
                      (e) user the chat facility to collude, engage in unlawful
                      conduct or encourage conduct we deem seriously
                      inappropriate. Any suspicious chats will be reported to
                      the competent authority.
                    </li>
                  </ul>
                  <li className="privacy-policy_list">
                    6.3. Live Chat is used as a form of communication between us
                    and you and should not be copied or shared with any forums
                    or third parties.
                  </li>
                </ul>
                <li className="privacy-policy_list">Limitation of Liability</li>
                <ul>
                  <li className="privacy-policy_list">
                    7.1. You enter the Website and participate in the Games at
                    your own risk. The Websites and the Games are provided
                    without any warranty whatsoever, whether expressed or
                    implied.
                  </li>
                  <li className="privacy-policy_list">
                    7.2. Without prejudice to the generality of the preceding
                    provision, we, our directors, employees, partners, service
                    providers.
                  </li>
                  <li className="privacy-policy_list">
                    7.3. Do not warrant that the software, Games and the
                    Websites are fit for their purpose.
                  </li>
                  <li className="privacy-policy_list">
                    7.4. Do not warrant that the software, Games and the
                    Websites are free from errors.
                  </li>
                  <li className="privacy-policy_list">
                    7.5. Do not warrant that the software, Games and the
                    Websites will be accessible without interruptions.
                  </li>
                  <li className="privacy-policy_list">
                    7.6. Shall not be liable for any loss, costs, expenses or
                    damages, whether direct, indirect, special, consequential,
                    incidental or otherwise, arising in relation to your use of
                    the Websites or your participation in the Games.
                  </li>
                  <li className="privacy-policy_list">
                    7.7. You understand and acknowledge that, if there is a
                    malfunction in a Game or its interoperability, any bets made
                    during such a malfunction shall be void. Funds obtained from
                    a malfunctioning Game shall be considered void, as well as
                    any subsequent game rounds with said funds, regardless of
                    what Games are played using such funds.
                  </li>
                  <li className="privacy-policy_list">
                    7.8. You hereby agree to fully indemnify and hold harmless
                    us, our directors, employees, partners, and service
                    providers for any cost, expense, loss, damages, claims and
                    liabilities howsoever caused that may arise in relation to
                    your use of the Website or participation in the Games.
                  </li>
                  <li className="privacy-policy_list">
                    7.9. To the extent permitted by law, our maximum liability
                    arising out of or in connection with your use of the
                    Websites, regardless of the cause of actions (whether in
                    contract, tort, breach of warranty or otherwise), will not
                    exceed €100.
                  </li>
                </ul>
                <li className="privacy-policy_list">
                  {' '}
                  Breaches, Penalties and Termination
                </li>
                <ul>
                  <li className="privacy-policy_list">
                    8.1. If you breach any provision of this User Agreement or
                    we have a reasonable ground to suspect that you have
                    breached them, we reserve the right to not open, to suspend,
                    or to close your Member Account, or withhold payment of your
                    winnings and apply such funds to any damages due by you.
                  </li>
                  <li className="privacy-policy_list">
                    8.2. You acknowledge that ELITEPLAY shall be the final
                    decision-maker of whether you have violated ELITEPLAY’s
                    rules, terms or conditions in a manner that results in your
                    suspension or permanent barring from participation in our
                    site.
                  </li>
                </ul>
                <li className="privacy-policy_list">Self-exclusion</li>
                <ul>
                    <li className="privacy-policy_list">9.1. By requesting a period of self-exclusion, you agree to follow the below terms and conditions, which will be in effect from the time that CS implements the chosen period of self-exclusion.</li>
                    <li className="privacy-policy_list">9.2. You may self-exclude for periods of 1, 3, 6, 12 month/s or permanent. Self-exclusion requests are to be made via Live Support.</li>
                    <li className="privacy-policy_list">9.3. Once you have self-excluded you will not be able to access your account or withdraw during this period.</li>
                    <li className="privacy-policy_list">9.4. If you have excluded your account whilst you have pending bets on your account, bets placed will remain valid and settle according to official results.</li>
                    <li className="privacy-policy_list">9.5. Once the period of self-exclusion has lapsed you may withdraw winnings from qualifying bets. ELITEPLAY does not cancel or void any bets placed before a self-exclusion has been affected.</li>
                    <li className="privacy-policy_list">9.6. Once you have self-excluded you will not be able to change or alter the period for a shorter length of time or have your self-exclusion cancelled until the period that you selected for self-exclusion has passed.</li>
                    <li className="privacy-policy_list">9.7. Please contact our customer services team if you wish to extend your self-exclusion period.</li>
                    <li className="privacy-policy_list">9.8. Once your self-exclusion period has elapsed, reinstatement of the account can be done by emailing the request to support@ELITEPLAY.</li>
                    <li className="privacy-policy_list">9.9. By self-excluding, you agree that:
                    <ul>
                        <li className="privacy-policy_list">a) You will not create another account during this period.</li>
                        <li className="privacy-policy_list">b) You will not deposit or attempt to deposit funds into a ELITEPLAY account.
</li>
                        <li className="privacy-policy_list">c) You will not wager on this website during this period.</li>
                        <li className="privacy-policy_list">d) This is a voluntary act initiated by yourself, and we will not be liable for any losses you may incur during the period of self-exclusion in any form.</li>
                    </ul>
                    </li>
                </ul>
              </ol>
              <p>Privacy Policy</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterSection;
