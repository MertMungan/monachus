import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "reactstrap";
import { connect } from "react-redux";
import { fetchSearch, addSearch } from "../../../../redux/actions/search/index";
import { Button, UncontrolledTooltip } from "reactstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AppCollapse from "@components/app-collapse";

const SearchComponent = ({
  configData = {},
  fetchSearch = () => {},
  addSearch = () => {},
}) => {
  const [searchConfig, setSearchConfig] = useState({});
  const [showSearchable, setShowSearchable] = useState(false);
  const [showTypo, setShowTypo] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showOptionalWords, setShowOptionalWords] = useState(false);
  const [showSeparatorChars, setShowSeparatorChars] = useState(false);
  const [showProximity, setShowProximity] = useState(false);
  const [showHitsPerPage, setShowHitsPerPage] = useState(false);
  const [showPaginationLimited, setShowPaginationLimited] = useState(false);
  const [showAttributesRetrieve, setShowAttributesRetrieve] = useState(false);
  useEffect(() => {
    fetchSearch();
  }, []);

  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };

  /******STATE DECLARATIONS*******/
  const [searchableAttributes, setSearchableAttributes] = useState(
    searchConfig?.searchableAttributes || []
  );
  const [optionalWords, setOptionalWords] = useState(
    searchConfig?.optionalWords || []
  );
  const [separatorChars, setSeparatorChars] = useState(
    searchConfig?.separatorChars || []
  );
  const [attributesRetrieve, setAttributesRetrieve] = useState(
    searchConfig?.attributesToRetrieve || []
  );
  const [languages, setLanguages] = useState({
    indexLanguages: searchConfig?.indexLanguages || [],
    queryLanguages: searchConfig?.queryLanguages || [],
    ignorePlural: searchConfig?.ignorePlural || [],
  });
  /***END OF STATE DECLARATION***/
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    setSearchConfig(configData);
    if (configData)
      setValue(
        "config",
        {
          searchableAttributes: configData.searchableAttributes,
          optionalWords: configData.optionalWords,
          separatorChars: configData.separatorChars,
          attributesRetrieve: configData.attributesRetrieve,
          typoTolerance: configData.typoTolerance,
          paginationLimited: parseInt(configData.paginationLimited),
        },
        { shouldDirty: true }
      );
  }, [configData]);

  const onSubmit = (data) => {
    /*************SETTING DATA***********************/
    data.searchableAttributes = searchableAttributes;
    data.optionalWords = optionalWords;
    data.separatorChars = separatorChars;
    data.attributesRetrieve = attributesRetrieve;
    data.typoTolerance = data.typoTolerance[0];
    if (data.typoTolerance.mode === "false") {
      data.typoTolerance = {
        mode: "false",
      };
    } else {
      data.typoTolerance = {
        mode: data.typoTolerance.mode,
        minChars1Typo: data.typoTolerance.minChars1Typo,
        minChars2Typo: data.typoTolerance.minChars2Typo,
      };
    }
    data.indexLanguages = languages.indexLanguages;
    data.queryLanguages = languages.queryLanguages;
    data.ignorePlural = languages.ignorePlural;
    data.proximity = parseInt(data.proximity);
    data.hitsPerPage = parseInt(data.hitsPerPage);
    data.paginationLimited = parseInt(data.paginationLimited);
    /*************END OF SETTING DATA***************/
    addSearch(data);
    // console.log(data);
  };
  /*******************HANDLE FUNCTION*********************/
  const handleInput = (e) => {
    if (
      (e.key === "Enter" || e.keyCode === 13) &&
      e.target.id === "searchableAttributes" &&
      e.target.value.length > 0 &&
      e.target.value.length < 10
    ) {
      setSearchableAttributes([
        ...configData.searchableAttributes,
        e.target.value,
      ]);
      e.target.value = "";
    }

    if (
      (e.key === "Enter" || e.keyCode === 13) &&
      e.target.id === "optionalWords" &&
      e.target.value.length > 0 &&
      e.target.value.length < 10
    ) {
      setOptionalWords([...configData.optionalWords, e.target.value]);
      e.target.value = "";
    }

    if (
      (e.key === "Enter" || e.keyCode === 13) &&
      e.target.id === "separatorChars" &&
      e.target.value.length > 0 &&
      e.target.value.length < 10
    ) {
      setSeparatorChars([...configData.separatorChars, e.target.value]);
      e.target.value = "";
    }

    if (
      (e.key === "Enter" || e.keyCode === 13) &&
      e.target.id === "attributesRetrieve" &&
      e.target.value.length > 0 &&
      e.target.value.length < 10
    ) {
      setAttributesRetrieve([...configData.attributesRetrieve, e.target.value]);
      e.target.value = "";
    }
  };

  /****************END OF HANDLE FUNCTION*****************/

  /****************HANDLE LANGUAGE FUNCTION***************/
  const handleLanguageSelection = (e) => {
    if (e.target.id === "indexLanguages") {
      languages.indexLanguages.push(e.target.value);
      setLanguages({ ...languages });
      configData.indexLanguages = languages.indexLanguages;
      document
        .getElementById("indexLanguages")
        .options[
          document.getElementById("indexLanguages").selectedIndex
        ].remove();
      e.target.value = "";
    }

    if (e.target.id === "queryLanguages") {
      languages.queryLanguages.push(e.target.value);
      setLanguages({ ...languages });
      configData.queryLanguages = languages.queryLanguages;
      document
        .getElementById("queryLanguages")
        .options[
          document.getElementById("queryLanguages").selectedIndex
        ].remove();
      e.target.value = "";
    }

    if (e.target.id === "ignorePlural") {
      languages.ignorePlural.push(e.target.value);
      setLanguages({ ...languages });
      configData.ignorePlural = languages.ignorePlural;
      document
        .getElementById("ignorePlural")
        .options[
          document.getElementById("ignorePlural").selectedIndex
        ].remove();
      e.target.value = "";
    }
  };
  /***************END OF HANDLE LANGUAGE FUNCTION*********/
  // console.log("searchableAttributes", searchableAttributes);
  // console.log("configData", configData);
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label for="searchableAttributes" id="searchableAttributes">
              Searchable Attributes{" "}
            </Label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="SearchAttributesTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="SearchAttributesTT">
              The complete list of attributes that will be used for searching.
            </UncontrolledTooltip>
            <input
              type="text"
              placeholder="searchableAttributes"
              name="searchableAttributes"
              id="searchableAttributes"
              className="form-control textCustomClass"
              ref={register({
                minLength: {
                  value: 1,
                  message: "Min length is 1",
                },
                maxLength: {
                  value: 10,
                  message: "Max length is 10",
                },
              })}
              onKeyDown={handleInput}
            />
            {errors.searchableAttributes && (
              <span>{errors.searchableAttributes.message}</span>
            )}
            <Label for="TypoTolerance" id="TypoToleranceTT">
              Typo Tolerance
            </Label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="TypoToleranceTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="TypoToleranceTT">
              The complete list of attributes that will be used for searching.
            </UncontrolledTooltip>
            <select
              name="typoTolerance.0.mode"
              className="form-control"
              ref={register}
            >
              <option value="true">true</option>
              <option value="false">false</option>
              <option value="min">min</option>
              <option value="strict">strict</option>
            </select>
            <label>Min Chars to Accept 1 Typo</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="minChar1TT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="minChar1TT">
              Minimum number of characters a word in the query string must
              contain to accept matches with 1 typo.
            </UncontrolledTooltip>
            <input
              type="number"
              placeholder="Min Chars to Accept 1 Typo"
              name="typoTolerance.0.minChars1Typo"
              className="form-control"
              ref={register({
                validate: (value) => {
                  if (value < 3) {
                    return { value: value, message: "Low value" };
                  }
                  if (value > 7) {
                    return { value: value, message: "High value" };
                  }
                },
                min: {
                  value: 1,
                },
              })}
            />
            <label>Min Chars to Accept 2 Typo</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="minChar2TT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="minChar2TT">
              Minimum number of characters a word in the query string must
              contain to accept matches with 2 typos.
            </UncontrolledTooltip>
            <input
              type="number"
              placeholder="Min Chars to Accept 2 Typo"
              name="typoTolerance.0.minChars2Typo"
              className="form-control"
              ref={register({
                validate: (value) => {
                  if (value < 3) {
                    return { value: value, message: "Low value" };
                  }
                  if (value > 7) {
                    return { value: value, message: "High value" };
                  }
                },
                min: {
                  value: 1,
                },
              })}
            />
            <label id="indexLanguagesLabel">Index Languages</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="indexLangTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="indexLangTT">
              Sets the languages at the index level for language-specific
              processing such as tokenization and normalization.
            </UncontrolledTooltip>
            <select
              name="indexLanguages"
              id="indexLanguages"
              className="form-control"
              ref={register}
              onChange={(e) => {
                handleLanguageSelection(e);
              }}
            >
              <option value="Turkish">Turkish</option>
              <option value="English">English</option>
              <option value="French">French</option>
            </select>
            <label
              id="
          queryLanguagesLabel"
            >
              Query Languages
            </label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="queryLangTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="queryLangTT">
              Sets the languages to be used by language-specific settings and
              functionalities such as ignorePlurals, removeStopWords, and CJK
              word-detection.
            </UncontrolledTooltip>
            <select
              name="queryLanguages"
              id="queryLanguages"
              className="form-control"
              ref={register}
              onChange={(e) => {
                handleLanguageSelection(e);
              }}
            >
              <option value="Turkish">Turkish</option>
              <option value="English">English</option>
              <option value="French">French</option>
            </select>
            <label id="ignorePluralLabel">Ignore Plural</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="ignorePluralTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="ignorePluralTT">
              If set to true, plurals won't be considered as typos: car/cars and
              foot/feet will be considered equal.
            </UncontrolledTooltip>
            <select
              name="ignorePlural"
              id="ignorePlural"
              className="form-control"
              ref={register}
              onChange={(e) => {
                handleLanguageSelection(e);
              }}
            >
              <option value="Turkish">Turkish</option>
              <option value="English">English</option>
              <option value="French">French</option>
            </select>
            <label>Optional Words</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="optionalWordsTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="optionalWordsTT">
              List of words that should be considered as optional.
            </UncontrolledTooltip>
            <input
              type="text"
              placeholder="optionalWords"
              name="optionalWords"
              id="optionalWords"
              className="form-control"
              ref={register({
                minLength: {
                  value: 1,
                  message: "Min length is 1",
                },
                maxLength: {
                  value: 10,
                  message: "Max length is 10",
                },
              })}
              onKeyDown={handleInput}
            />
            {errors.optionalWords && (
              <span>{errors.optionalWords.message}</span>
            )}
            <label>Separator Chars</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="seperatorCharsTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="seperatorCharsTT">
              List of separators (punctuation characters) to make searchable.
            </UncontrolledTooltip>
            <input
              type="text"
              placeholder="separatorChars"
              name="separatorChars"
              id="separatorChars"
              className="form-control"
              ref={register({
                minLength: {
                  value: 1,
                  message: "Min length is 1",
                },
                maxLength: {
                  value: 10,
                  message: "Max length is 10",
                },
              })}
              onKeyDown={handleInput}
            />
            {errors.separatorChars && (
              <span>{errors.separatorChars.message}</span>
            )}
            <label>Proximity</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="proximityTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="proximityTT">
              Precision of the proximity ranking criterion.
            </UncontrolledTooltip>
            <select
              name="proximity"
              className="form-control select"
              ref={register}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <label>Hits per Page</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="hitsPerPageTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="hitsPerPageTT">
              Number of hits per page.
            </UncontrolledTooltip>
            <input
              type="number"
              placeholder="hitsPerPage"
              name="hitsPerPage"
              className="form-control"
              ref={register({
                min: {
                  value: 1,
                },
                max: {
                  value: 1000,
                },
              })}
            />
            {errors.hitsPerPage && <span>{errors.hitsPerPage.message}</span>}
            <label>Pagination Limited</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="paginationTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="paginationTT">
              Set the maximum number of hits accessible via pagination.
            </UncontrolledTooltip>
            <input
              type="number"
              placeholder="paginationLimited"
              name="paginationLimited"
              className="form-control"
              ref={register({
                min: {
                  value: 1,
                },
                max: {
                  value: 10000,
                },
              })}
            />
            {errors.paginationLimited && (
              <span>{errors.paginationLimited.message}</span>
            )}
            <label>Attributes to Retrieve</label>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ed2419"
              id="attributesTT"
              className="bi bi-question-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <UncontrolledTooltip placement="top" target="attributesTT">
              Attributes of the records that will be sent within the answer to a
              search.
            </UncontrolledTooltip>
            <input
              type="text"
              placeholder="attributesRetrieve"
              name="attributesRetrieve"
              id="attributesRetrieve"
              className="form-control"
              ref={register({
                minLength: {
                  value: 1,
                  message: "Min length is 1",
                },
                maxLength: {
                  value: 10,
                  message: "Max length is 10",
                },
              })}
              onKeyDown={handleInput}
            />
            {errors.attributesRetrieve && (
              <span>{errors.attributesRetrieve.message}</span>
            )}
            <br />
            <input className="form-control button" type="submit" />
            <br />
            <input className="form-control button" type="reset" />
          </form>
        </div>
        <div className="col col-lg-6">
          <div className="accordion mt-2" id="accordionExample">
            {configData.searchableAttributes && (
              <AppCollapse
                data={[
                  {
                    title: "Searchable Attributes",
                    content: (
                      <div>
                        {configData.searchableAttributes.map((attr) => (
                          <div key={attr}>{attr}</div>
                        ))}
                      </div>
                    ),
                  },
                ]}
                accordion={true}
                type="info"
                className="app-collapse"
              />
            )}
            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-block text-center"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                style={{ color: "#cacad1" }}
                onClick={() => {
                  setShowSearchable(!showSearchable);
                }}
              >
                Searchable Attributes
              </button>

              <div
                id="collapseOne"
                className={showSearchable ? "collapse show" : "collapse"}
                data-parent="#accordionExample"
              >
                {configData?.searchableAttributes?.map((attribute) => (
                  <div className="card-body">{attribute}</div>
                ))}
              </div>
            </div> */}

            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-block text-center"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
                style={{ color: "#cacad1" }}
                onClick={() => {
                  setShowTypo(!showTypo);
                }}
              >
                Typo Tolerance
              </button>

              <div
                id="collapseTwo"
                className={showTypo ? "collapse show" : "collapse"}
                data-parent="#accordionExample"
              >
                {Object.keys(configData?.typoTolerance).map((key) => (
                  <>
                    <div className="card-body">
                      {key}: {configData.typoTolerance[key]}
                    </div>
                  </>
                ))}
              </div>
            </div> */}
            {configData.typoTolerance && (
              <>
                <br />
                <AppCollapse
                  data={[
                    {
                      title: "Typo Tolerance",
                      content: (
                        <div>
                          {Object.keys(configData.typoTolerance).map((key) => (
                            <div key={key}>
                              {key}: {configData.typoTolerance[key]}
                            </div>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                  accordion={true}
                  type="info"
                  className="app-collapse"
                />
              </>
            )}
            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-block text-center"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
                style={{ color: "#cacad1" }}
                onClick={() => {
                  setShowLanguages(!showLanguages);
                }}
              >
                Languages
              </button>

              <div
                id="collapseThree"
                className={showLanguages ? "collapse show" : "collapse"}
                data-parent="#accordionExample"
              >
                Index Languages
                {configData?.indexLanguages?.map((language) => (
                  <div className="card-body">{language}</div>
                ))}
                <br />
                Query Languages
                {configData?.queryLanguages?.map((language) => (
                  <div className="card-body">{language}</div>
                ))}
                <br />
                Ignore Plural
                {configData?.ignorePlural?.map((language) => (
                  <div className="card-body">{language}</div>
                ))}
              </div>
            </div>
 */}
            {configData.indexLanguages &&
              configData.indexLanguages &&
              configData.ignorePlural && (
                <>
                  <br />
                  <AppCollapse
                    data={[
                      {
                        title: "Languages",
                        content: (
                          <div>
                            <div>Index Languages</div>
                            {configData.indexLanguages.map((language) => (
                              <div key={language}>{language}</div>
                            ))}
                            <br />
                            <div>Query Languages</div>
                            {configData.queryLanguages.map((language) => (
                              <div key={language}>{language}</div>
                            ))}
                            <br />
                            <div>Ignore Plural</div>
                            {configData.ignorePlural.map((language) => (
                              <div key={language}>{language}</div>
                            ))}
                          </div>
                        ),
                      },
                    ]}
                    accordion={true}
                    type="info"
                    className="app-collapse"
                  />
                </>
              )}
            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-block text-center"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFour"
                aria-expanded="true"
                aria-controls="collapseFour"
                style={{ color: "#cacad1" }}
                onClick={() => {
                  setShowOptionalWords(!showOptionalWords);
                }}
              >
                Optional Words
              </button>
              <div
                id="collapseFour"
                className={showOptionalWords ? "collapse show" : "collapse"}
                data-parent="#accordionExample"
              >
                {configData?.optionalWords?.map((word) => (
                  <div className="card-body">{word}</div>
                ))}
              </div>
            </div> */}
            {configData.optionalWords && (
              <>
                <br />
                <AppCollapse
                  data={[
                    {
                      title: "Optional Words",
                      content: (
                        <div>
                          {configData.optionalWords.map((word) => (
                            <div key={word}>{word}</div>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                  accordion={true}
                  type="info"
                  className="app-collapse"
                />
              </>
            )}
            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-block text-center"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFive"
                aria-expanded="true"
                aria-controls="collapseFive"
                style={{ color: "#cacad1" }}
                onClick={() => {
                  setShowSeparatorChars(!showSeparatorChars);
                }}
              >
                Separator Chars
              </button>
              <div
                id="collapseFive"
                className={showSeparatorChars ? "collapse show" : "collapse"}
                data-parent="#accordionExample"
              >
                {configData?.separatorChars?.map((char) => (
                  <div className="card-body">{char}</div>
                ))}
              </div>
            </div> */}

            {configData.separatorChars && (
              <>
                <br />
                <AppCollapse
                  data={[
                    {
                      title: "Separator Chars",
                      content: (
                        <div>
                          {configData.separatorChars.map((char) => (
                            <div key={char}>{char}</div>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                  accordion={true}
                  type="info"
                  className="app-collapse"
                />
              </>
            )}

            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-block text-center"
                type="button"
                data-toggle="collapse"
                data-target="#collapseSix"
                aria-expanded="true"
                aria-controls="collapseSix"
                style={{ color: "#cacad1" }}
                onClick={() => {
                  setShowProximity(!showProximity);
                }}
              >
                Proximity
              </button>

              <div
                id="collapseSix"
                className={showProximity ? "collapse show" : "collapse"}
                data-parent="#accordionExample"
              >
                <div className="card-body">{configData?.proximity}</div>
              </div>
            </div> */}
            {configData.proximity && (
              <>
                <br />
                <AppCollapse
                  data={[
                    {
                      title: "Proximity",
                      content: (
                        <div>
                          <div className="card-body">
                            {configData.proximity}
                          </div>
                        </div>
                      ),
                    },
                  ]}
                  accordion={true}
                  type="info"
                  className="app-collapse"
                />
              </>
            )}

            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-link btn-block text-center"
                type="button"
                data-toggle="collapse"
                data-target="#collapseSeven"
                aria-expanded="true"
                aria-controls="collapseSeven"
                style={{ color: "#cacad1" }}
                onClick={() => {
                  setShowHitsPerPage(!showHitsPerPage);
                }}
              >
                Hits Per Page
              </button>

              <div
                id="collapseSeven"
                className={showHitsPerPage ? "collapse show" : "collapse"}
                data-parent="#accordionExample"
              >
                <div className="card-body">{configData?.hitsPerPage}</div>
              </div>
            </div> */}
            {configData.hitsPerPage && (
              <>
                <br />
                <AppCollapse
                  data={[
                    {
                      title: "Hits Per Page",
                      content: (
                        <div>
                          <div className="card-body">
                            {configData.hitsPerPage}
                          </div>
                        </div>
                      ),
                    },
                  ]}
                  accordion={true}
                  type="info"
                  className="app-collapse"
                />
              </>
            )}
            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-block text-center"
                type="button"
                data-toggle="collapse"
                data-target="#collapseEight"
                aria-expanded="true"
                aria-controls="collapseEight"
                style={{ color: "#cacad1" }}
                onClick={() => {
                  setShowPaginationLimited(!showPaginationLimited);
                }}
              >
                Pagination Limited
              </button>

              <div
                id="collapseEight"
                className={showPaginationLimited ? "collapse show" : "collapse"}
                data-parent="#accordionExample"
              >
                <div className="card-body">{configData?.paginationLimited}</div>
              </div>
            </div> */}
            {configData.paginationLimited && (
              <>
                <br />
                <AppCollapse
                  data={[
                    {
                      title: "Pagination Limited",
                      content: (
                        <div>
                          <div className="card-body">
                            {configData.paginationLimited}
                          </div>
                        </div>
                      ),
                    },
                  ]}
                  accordion={true}
                  type="info"
                  className="app-collapse"
                />
              </>
            )}

            {/* <div className="card">
              <button
                className="form-control btn-outline-primary btn-block text-center"
                style={{ color: "#cacad1" }}
                type="button"
                data-toggle="collapse"
                data-target="#collapseNine"
                aria-expanded="true"
                aria-controls="collapseNine"
                onClick={() => {
                  setShowAttributesRetrieve(!showAttributesRetrieve);
                }}
              >
                Attributes to Retrieve
              </button>

              <div
                id="collapseNine"
                className={
                  showAttributesRetrieve ? "collapse show" : "collapse"
                }
                data-parent="#accordionExample"
              >
                {configData?.attributesRetrieve?.map((attribute) => (
                  <div className="card-body">{attribute}</div>
                ))}
              </div>
            </div> */}
            {configData.attributesRetrieve && (
              <>
                <br />
                <AppCollapse
                  data={[
                    {
                      title: "Attributes to Retrieve",
                      content: (
                        <div>
                          {configData.attributesRetrieve.map((attribute) => (
                            <div key={attribute}>{attribute}</div>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                  accordion={true}
                  type="info"
                  className="app-collapse"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SearchComponent.propTypes = {
  addSearch: PropTypes.func,
  fetchSearch: PropTypes.func,
  configData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  configData: state.search,
});

export default connect(mapStateToProps, { addSearch, fetchSearch })(
  SearchComponent
);
